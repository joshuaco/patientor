import { z } from "zod";
import { DiagnoseSchema } from "./diagnose-schema";

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export const HealthCheckRatingEnum = z.nativeEnum(HealthCheckRating);

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string().min(5, { message: "Too short description" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in the format YYYY-MM-DD",
  }),
  specialist: z.string().min(5, { message: "Too short specialist name" }),
  diagnosisCodes: z.array(DiagnoseSchema.shape.code).optional(),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingEnum,
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD",
    }),
    criteria: z.string().min(5, { message: "Too short criteria description" }),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(2, { message: "Too short employer name" }),
  sickLeave: z
    .object({
      startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in the format YYYY-MM-DD",
      }),
      endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in the format YYYY-MM-DD",
      }),
    })
    .optional(),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);

export const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema.omit({ id: true }),
  HospitalEntrySchema.omit({ id: true }),
  OccupationalHealthcareEntrySchema.omit({ id: true }),
]);
