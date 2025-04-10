
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user?.isAdmin) {
    return res.status(403).json({ message: 'Forbidden access' });
  }
  next();
};
