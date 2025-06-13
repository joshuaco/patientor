import { v4 as uuidv4 } from "uuid";
import { NewPatient, Patient, PublicPatient } from "../types/patients";
import patients from "../../data/patients";

const getAllPatients = (): Patient[] => {
  return patients;
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

const addNewPatient = (patientData: NewPatient) => {
  const newPatient = {
    id: uuidv4(),
    ...patientData,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { addNewPatient, getAllPatients, getAllPublicPatients };
