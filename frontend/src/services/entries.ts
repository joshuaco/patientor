import api from '@/lib/interceptors/axios';
import type { Entry, NewEntry } from '@/types/patient';

export const createEntry = async (
  patientId: string,
  newEntry: NewEntry
): Promise<Entry> => {
  try {
    const response = await api.post(`/patients/${patientId}/entries`, newEntry);
    return response.data;
  } catch (error) {
    console.error('Error creating entry:', error);
    throw error;
  }
};

export const deleteEntry = async (
  patientId: string,
  entryId: string
): Promise<void> => {
  try {
    await api.delete(`/patients/${patientId}/entries/${entryId}`);
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
};
