# LuxCare - Senior Living Platform

A full-stack web application for a senior living facility, providing information about services, testimonials, and contact options for prospective residents and their families.

## Features

- Responsive frontend built with React, Tailwind CSS, and Shadcn UI
- RESTful API backend with Express
- In-memory data store with Drizzle ORM for easy database migration
- Authentication system with Passport.js
- Email integration with SendGrid
- Form handling with validation

## Tech Stack

### Frontend
- React 18
- TanStack Query (React Query)
- Tailwind CSS
- Shadcn UI (Radix UI primitives)
- Framer Motion for animations
- Wouter for routing

### Backend
- Express.js
- Drizzle ORM
- Passport.js for authentication
- SendGrid for email

### Development & Build Tools
- TypeScript
- Vite for frontend
- tsx for backend development
- ESBuild for production builds

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/luxcare.git
   cd luxcare
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Development environment variables
   SESSION_SECRET=your_session_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   ADMIN_EMAIL=admin@example.com
   GUIDE_PDF_URL=https://example.com/senior-care-guide.pdf
   ```

### Development

Run the application in development mode with both the client and server:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Run just the API server
npm run dev:server

# Run just the frontend
npm run dev:client
```

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

- `client/`: Frontend React application
  - `src/`: Source files
    - `components/`: UI components
    - `pages/`: Page components
    - `hooks/`: Custom React hooks
    - `lib/`: Utility functions
    - `styles/`: CSS files
- `server/`: Backend Express application
  - `middleware/`: Express middleware
  - `index.ts`: Server entry point
  - `routes.ts`: API route definitions
  - `storage.ts`: Data storage implementation
  - `mail.ts`: Email service implementation
- `shared/`: Code shared between frontend and backend
  - `schema.ts`: Database schema definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 