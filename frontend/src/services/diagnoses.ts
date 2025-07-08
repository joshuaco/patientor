import api from '@/utils/axios';
import type { Diagnose } from '@/types/patient';

export const getDiagnoses = async (): Promise<Diagnose[]> => {
  const response = await api.get('/diagnoses');
  return response.data;
};
