import { v4 as uuidv4 } from "uuid";
import { NewEntry, Patient } from "../types/patients";

const addNewEntry = (entryData: NewEntry, patient: Patient) => {
  const newEntry = {
    id: uuidv4(),
    ...entryData,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default { addNewEntry };
