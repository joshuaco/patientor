import { z } from 'zod';
import type {
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
} from '@/schemas/entry-schema';

export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export type OccupationalHealthcareEntry = z.infer<
  typeof OccupationalHealthcareEntrySchema
>;

export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
