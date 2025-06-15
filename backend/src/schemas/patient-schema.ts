import { z } from 'zod';
import { EntrySchema } from './entry-schema';

export const GenderSchema = z.enum(['male', 'female', 'other'], {
  message: 'Invalid gender. Must be male, female or other',
});

export const NewPatientSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Name must be at least 5 characters long' }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in format YYYY-MM-DD',
  }),
  gender: GenderSchema,
  occupation: z
    .string()
    .min(5, { message: 'Occupation must be at least 5 characters long' }),
  ssn: z
    .string()
    .min(9, { message: 'SSN must be 9 characters long' })
    .regex(/^\d{6}-\d{3}[A-Z]$/, {
      message: 'SSN must be in format DDMMYY-XXL (e.g. 010101-123A)',
    }),
});

export const PatientSchema = NewPatientSchema.extend({
  id: z.string().uuid(),
  entries: z.array(EntrySchema),
});
