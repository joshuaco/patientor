import type { Patient } from './patients';

declare global {
  namespace Express {
    interface Request {
      patient: Patient;
    }
  }
}
