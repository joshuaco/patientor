import { NextFunction, Request, Response } from 'express';
import { NewPatientSchema } from '../schemas/patient-schema';

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
