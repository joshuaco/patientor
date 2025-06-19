import { v4 as uuidv4 } from "uuid";
import { NewEntry } from "../types/patients";

const addNewEntry = (entryData: NewEntry) => {
  const newEntry = {
    id: uuidv4(),
    ...entryData,
  };

  //patient.entries.push(newEntry);

  return newEntry;
};

export default { addNewEntry };
