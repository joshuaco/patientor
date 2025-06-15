export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries?: [];
};

export type NewPatient = Omit<Patient, 'id'>;
