import { NewPatient } from '../types/patients';
import { NewPatientSchema } from '../schemas/patientSchema';

const toNewPatientEntry = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default toNewPatientEntry;
