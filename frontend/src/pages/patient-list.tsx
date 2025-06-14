import { useState } from 'react';
import { User, Plus } from 'lucide-react';
import HealthRatingBar from '@/components/health-rating-bar';
import AddPatientForm from '@/components/add-patient-form';
import Modal from '@/components/modal-form';

import type { Patient } from '@/types/patient';

interface PatientListProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

function PatientList({ patients, setPatients }: PatientListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <User size={24} />
          Patient List
        </h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Plus size={24} className="hidden md:block" />
          Add Patient
        </button>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="Add Patient">
          <AddPatientForm
            onClose={() => setIsOpen(false)}
            setPatients={setPatients}
          />
        </Modal>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table
          className="min-w-full divide-y divide-gray-200"
          aria-label="Patient List"
        >
          <thead className="bg-gray-50">
            <tr className="divide-x divide-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Occupation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="divide-x divide-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 w-full max-w-0 truncate sm:max-w-none sm:w-auto">
                  {patient.name}
                  <dl className="lg:hidden">
                    <dt className="sr-only sm:hidden">Gender</dt>
                    <dd className="text-sm text-gray-500 sm:hidden">
                      {patient.gender}
                    </dd>
                    <dt className="sr-only lg:hidden">Occupation</dt>
                    <dd className="text-sm text-gray-500 truncate lg:hidden">
                      {patient.occupation}
                    </dd>
                  </dl>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 hidden sm:table-cell">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 hidden lg:table-cell">
                  {patient.occupation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <HealthRatingBar rating={3} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PatientList;
