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

export const entryExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { entryId } = req.params;
  if (!req.patient.entries.find((entry) => entry.id === entryId)) {
    res.status(404).json({ error: 'Entry not found' });
    return;
  }
  next();
};
