import { Request, Response, NextFunction } from 'express';

// Define a type for the user object expected in the session
interface SessionUser {
  id: number;
  username: string;
  // Add isAdmin if it's intended to be used, otherwise remove check below
  // isAdmin?: boolean; 
}

// Extend the Express SessionData type
declare module 'express-session' {
  interface SessionData {
    user?: SessionUser;
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized: Please log in.' }); // More informative message
  }
  next();
};

// Note: The `isAdmin` check currently relies on a property that doesn't exist
// in the User schema or SessionUser interface. This needs to be added to the
// User schema and populated during login if admin functionality is required.
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Temporarily commenting out or adjusting isAdmin check until `isAdmin` is implemented
  /*
  if (!req.session.user?.isAdmin) { // Requires `isAdmin` property on SessionUser
    return res.status(403).json({ message: 'Forbidden: Administrator access required.' });
  }
  */
  // If you need this functionality, ensure the user model and session population include `isAdmin`.
  // For now, let's assume any authenticated user can proceed, or return Forbidden.
  // Option 1: Allow any authenticated user (remove isAdmin check)
  // next(); 
  // Option 2: Block all access via this middleware until implemented
  return res.status(403).json({ message: 'Forbidden: Admin functionality not fully implemented.' });
  
  // If implementing, uncomment the check above and ensure SessionUser has `isAdmin`
  // next(); 
};
