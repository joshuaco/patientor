import { NextFunction, Request, Response } from 'express';
import { NewPatientSchema } from '../schemas/patient-schema';

import patients from '../../data/patients';

import type { Patient } from '../types/patients';

declare module 'express' {
  interface Request {
    patient: Patient;
  }
}

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

export const patientExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const patient = patients.find((p) => p.id === id);

  if (patient) {
    req.patient = patient;
  } else {
    res.status(404).json({ error: 'Patient not found' });
    return;
  }
  next();
};
