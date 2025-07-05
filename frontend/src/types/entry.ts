import { z } from 'zod';
import type {
  EntryTypeSchema,
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
} from '@/schemas/entry-schema';

export type EntryType = z.infer<typeof EntryTypeSchema>;

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
