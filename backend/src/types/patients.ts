import { z } from 'zod';
import {
  PatientSchema,
  NewPatientSchema,
  GenderSchema,
} from '../schemas/patient-schema';
import { EntrySchema } from '../schemas/entry-schema';

export type Patient = z.infer<typeof PatientSchema>;
export type NewPatient = z.infer<typeof NewPatientSchema>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type Gender = z.infer<typeof GenderSchema>;

export type Entry = z.infer<typeof EntrySchema>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, 'id'>;
