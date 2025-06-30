import { useState, useEffect } from 'react';
import type { PublicPatient } from '@/types/patient';
import { getAllPatients } from '@/services/patients';
import PatientList from '@/pages/patient-list';

function Home() {
  const [patients, setPatients] = useState<PublicPatient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await getAllPatients();
      setPatients(patients);
    };

    fetchPatients();
  }, []);

  return (
    <>
      {patients.length > 0 ? (
        <PatientList patients={patients} setPatients={setPatients} />
      ) : (
        <div>No patients found</div>
      )}
    </>
  );
}

export default Home;
