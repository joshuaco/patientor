import { useState, useEffect } from 'react';
import type { Patient } from '@/types/patient';
import { getAllPatients } from '@/services/patients';
import PatientList from '@/pages/patient-list';

function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await getAllPatients();
      setPatients(patients);
    };

    fetchPatients();
  }, []);

  return (
    <>
      <PatientList patients={patients} setPatients={setPatients} />
    </>
  );
}

export default Home;
