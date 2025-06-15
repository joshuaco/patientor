import api from '@/lib/interceptors/axios';
import type { Patient, NewPatient } from '@/types/patient';

export const getAllPatients = async (): Promise<Patient[]> => {
  const response = await api.get<Patient[]>('/patients');
  return response.data;
};

export const getPatientById = async (id: string): Promise<Patient> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await api.get<Patient>(`/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient by id:', error);
    throw error;
  }
};

export const createPatient = async (
  newPatient: NewPatient
): Promise<Patient> => {
  try {
    const response = await api.post<Patient>('/patients', newPatient);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};
