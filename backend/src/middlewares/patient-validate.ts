import { NextFunction, Request, Response } from 'express';
import { NewPatientSchema } from '../schemas/patientSchema';
import { ZodError } from 'zod';

export const patientValidate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

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
