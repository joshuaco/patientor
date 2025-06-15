import api from '@/lib/interceptors/axios';
import type { Diagnose } from '@/types/patient';

export const getDiagnoses = async (): Promise<Diagnose[]> => {
  const response = await api.get('/diagnoses');
  return response.data;
};
