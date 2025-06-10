import api from '@/lib/interceptors/axios';
import type { Patient } from '@/types/patient';

export const getAllPatients = async (): Promise<Patient[]> => {
  const response = await api.get<Patient[]>('/patients');
  return response.data;
};
