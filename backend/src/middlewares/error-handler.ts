import { Response, Request, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({ error: error.flatten().fieldErrors });
  } else {
    next(error);
  }
};
