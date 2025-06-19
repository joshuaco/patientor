import { Request, Response, NextFunction } from 'express';
import { NewEntrySchema } from '../schemas/entry-schema';

export const validateEntry = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
