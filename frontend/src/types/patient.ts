import { z } from 'zod';
import {
  PatientSchema,
  NewPatientSchema,
  GenderSchema,
} from '../schemas/patient-schema';
import { EntrySchema, NewEntrySchema } from '../schemas/entry-schema';
import { DiagnoseSchema } from '../schemas/diagnose-schema';

export type Patient = z.infer<typeof PatientSchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type Gender = z.infer<typeof GenderSchema>;

export type Entry = z.infer<typeof EntrySchema>;
export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Diagnose = z.infer<typeof DiagnoseSchema>;
