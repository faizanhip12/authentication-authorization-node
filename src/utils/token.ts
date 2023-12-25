import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secretKey = 'your-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-keyyour-secret-key';

export const generateToken = (user: any) => {
  console.log("generate token", user)
  const token = jwt.sign(user, secretKey);
  console.log("token", token)
  return token
};

export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.header('Authorization');
  //@ts-ignore
  console.log("req.user verify token", )


  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const tokenParts = token.split(' ');
  const tokenValue = tokenParts[1];
  jwt.verify(tokenValue, secretKey, (err: any, decoded: any) => {
    if (err) {
      console.log("err", err)
      return res.status(403).json({ message: 'Forbidden' });
    }

    req['user'] = decoded; // Attach decoded user to request object
    next();
  });
};