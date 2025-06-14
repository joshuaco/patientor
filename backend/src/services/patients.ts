import { v4 as uuidv4 } from 'uuid';
import { NewPatient, Patient, PublicPatient } from '../types/patients';
import patients from '../../data/patients';

const getAllPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const getAllPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNewPatient = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientData,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  addNewPatient,
  getPatientById,
  getAllPatients,
  getAllPublicPatients,
};
