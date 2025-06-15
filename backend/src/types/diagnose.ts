import { z } from 'zod';
import { DiagnoseSchema } from '../schemas/diagnose-schema';

export type Diagnose = z.infer<typeof DiagnoseSchema>;
