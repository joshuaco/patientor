import { Patient, PublicPatient } from "../types/patients";
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

export default { getAllPatients, getAllPublicPatients };
