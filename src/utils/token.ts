import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'your-secret-key';

export const generateToken = (user: any): string => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
  };
  
  export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      req['user'] = decoded; // Attach decoded user to request object
      next();
    });
  };