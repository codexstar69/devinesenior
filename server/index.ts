import 'dotenv/config';

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

// Log mode
log(`Starting server in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

// Enable trust proxy for rate limiter
app.set('trust proxy', 1);

// Security middleware - Configure Helmet differently for development and production
if (isProduction) {
  // Use strict CSP in production
  app.use(helmet());
} else {
  // Disable CSP entirely in development to allow Vite's inline scripts
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disable CSP completely in development
    })
  );
}

// More flexible CORS setup
const allowedOrigins = [
  'https://devineseniorliving.com', // Production domain
];

// Add development origins when in dev mode
if (isDevelopment) {
  allowedOrigins.push('http://localhost:3000'); // Vite dev server
  allowedOrigins.push('http://localhost:5000'); // Express original port
  allowedOrigins.push('http://localhost:5001'); // Express fallback port
  
  // Add localhost with other potential ports for development
  for (let port = 5002; port <= 5010; port++) {
    allowedOrigins.push(`http://localhost:${port}`);
  }
}

app.use(cors({
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // In development, allow requests with no origin (like curl/Postman)
    if (!origin || isDevelopment) return callback(null, true);
    
    // In production, only allow specific origins
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Rate limiting - More relaxed in development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 100 : 1000, // More relaxed in development
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Ensure SESSION_SECRET is set
if (!process.env.SESSION_SECRET) {
  console.error("FATAL ERROR: SESSION_SECRET is not set.");
  if (isProduction) {
    process.exit(1); // Exit if in production and secret is missing
  } else {
    console.warn("Using default session secret for development. Please set SESSION_SECRET environment variable.");
  }
}

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-dev-secret', // Use default only in non-prod
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security headers - Only apply in production or customize for development
if (isProduction) {
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
} else {
  // In development, only set non-CSP related security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // Skip X-Frame-Options and X-XSS-Protection to avoid conflicts with Vite
    next();
  });
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Centralized Error Handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err); // Log the full error
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Avoid sending response if headers already sent
    if (res.headersSent) {
       console.error("Error handler called after headers were sent.");
       // Potentially close the connection or let default Express handler manage
       return; 
    }
    
    res.status(status).json({ message });
    // Do not throw the error again here
  });

  // Only setup Vite in development and after API routes are registered
  if (isDevelopment) {
    // In our new approach, this becomes optional since we also have a separate Vite server
    // But we'll keep it as a fallback option when not using dev:all
    await setupVite(app, server);
  } else {
    // In production, serve static files from the build directory
    serveStatic(app);
  }

  // Use an alternate port if default is already in use
  const startServer = (port: number) => {
    server.listen(port, "0.0.0.0")
      .on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is already in use, trying port ${port + 1}`);
          startServer(port + 1);
        } else {
          console.error('Server error:', err);
        }
      })
      .on('listening', () => {
        const address = server.address();
        const actualPort = typeof address === 'object' && address ? address.port : port;
        log(`Server running at http://localhost:${actualPort}`);
      });
  };

  // Try to use port 5000, but will increment if in use
  startServer(5000);
})();
