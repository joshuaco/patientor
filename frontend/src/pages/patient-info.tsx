import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Venus,
  Mars,
  VenusAndMars,
  User,
  Briefcase,
  IdCard,
} from 'lucide-react';
import { getPatientById } from '@/services/patients';
import type { Patient } from '@/types/patient';

import EntriesInfo from '@/components/entries-info';

function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await getPatientById(id as string);
      setPatient(patient);
    };
    fetchPatient();
  }, [id]);

  const getGenderIcon = (gender: string) => {
    if (gender === 'male') return <Mars className="text-blue-500 w-6 h-6" />;
    if (gender === 'female') return <Venus className="text-pink-500 w-6 h-6" />;
    return <VenusAndMars className="text-gray-500 w-6 h-6" />;
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-blue-200 rounded-full"></div>
          <div className="text-gray-600 font-medium">
            Loading patient information...
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center">
          <User className="text-blue-600 w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{patient.name}</h1>
            {getGenderIcon(patient.gender)}
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <IdCard className="text-green-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-600 mb-1">
              Identification Number
            </h3>
            <p className="text-lg font-mono font-medium text-gray-900">
              {patient.ssn}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <Briefcase className="text-purple-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-600 mb-1">Occupation</h3>
            <p className="text-lg font-medium text-gray-900 capitalize">
              {patient.occupation}
            </p>
          </div>
        </div>
      </div>

      {/* Entries Information */}
      <EntriesInfo entries={patient.entries} setPatient={setPatient} />
    </section>
  );
}

export default PatientInfo;
