import { z } from 'zod';
import {
  PatientSchema,
  NewPatientSchema,
  GenderSchema,
} from '../schemas/patientSchema';

export type Patient = z.infer<typeof PatientSchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PublicPatient = Omit<Patient, 'ssn'>;

export type Gender = z.infer<typeof GenderSchema>;
