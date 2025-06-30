import api from '@/lib/interceptors/axios';
import type { Entry, NewEntry } from '@/types/patient';

export const createEntry = async (
  patientId: string,
  newEntry: NewEntry
): Promise<Entry> => {
  try {
    const response = await api.post(`/patients/${patientId}/entries`, newEntry);
    console.log('Entry created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating entry:', error);
    throw error;
  }
};
