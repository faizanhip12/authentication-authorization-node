import { Request, Response, NextFunction } from 'express';

type AsyncFunction<T> = (req: T, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler =
  <T>(execution: AsyncFunction<T>) =>
  (req: T, res: Response, next: NextFunction) =>
    Promise.resolve(execution(req, res, next)).catch((error) => next(error));

export default asyncHandler;
