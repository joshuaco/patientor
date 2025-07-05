import {
  Calendar,
  ClipboardList,
  FileText,
  HeartPulse,
  Stethoscope,
  BriefcaseBusiness,
  Heart,
  Plus,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getDiagnoses } from '@/services/diagnoses';
import type { Diagnose, Entry, Patient } from '@/types/patient';
import type {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '@/types/entry';

import Modal from './modal-form';
import AddEntryForm from './add-entry-form';

interface EntriesInfoProps {
  entries: Entry[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

function EntriesInfo({ entries, setPatient }: EntriesInfoProps) {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await getDiagnoses();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
            <HeartPulse className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Entries</h2>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors duration-200"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <FileText className="h-12 w-12 mb-4 text-gray-300" />
          <p className="text-lg">No medical entries found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-base font-semibold text-gray-800">
                      {entry.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                    <p className="text-base text-gray-700 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>

                  <EntryDetails entry={entry} />

                  {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <DiagnosisInfo
                      diagnosisCodes={entry.diagnosisCodes}
                      diagnoses={diagnoses}
                    />
                  )}

                  <div className="flex items-center gap-2">
                    <p className="text-gray-700">
                      Diagnose by{' '}
                      <span className="font-semibold">{entry.specialist}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="Add Entry">
          <AddEntryForm
            diagnoses={diagnoses}
            setPatient={setPatient}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

function DiagnosisInfo({
  diagnosisCodes,
  diagnoses,
}: {
  diagnosisCodes: string[];
  diagnoses: Diagnose[];
}) {
  const getDiagnoseName = (code: string) => {
    const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
    return diagnose?.name;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-gray-500" />
        <span className="text-base font-medium text-gray-700">
          Diagnosis Codes
        </span>
      </div>

      <div className="grid gap-3">
        {diagnosisCodes.map((code) => (
          <div
            key={code}
            className="bg-blue-50 border border-blue-200 rounded-md p-4 hover:bg-blue-100 transition-colors duration-150"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                {code}
              </span>
              <p className="text-base text-gray-700 flex-1">
                {getDiagnoseName(code) || 'Diagnosis name not found'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EntryDetails({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return null;
  }
}

function HospitalEntryDetails({ entry }: { entry: HospitalEntry }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-gray-500" />
        <p className="text-base text-gray-700">
          Discharged on{' '}
          <span className="font-semibold">{entry.discharge.date}</span>
        </p>
        <p className="text-base text-gray-700">
          Criteria: {entry.discharge.criteria}
        </p>
      </div>
    </div>
  );
}

function OccupationalHealthcareEntryDetails({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
        <p className="text-base text-gray-700">
          Employer: {entry.employerName}
        </p>
      </div>
      {entry.sickLeave && (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <p className="text-base text-gray-700">
            Sick leave:{' '}
            <span className="font-medium">
              {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

function HealthCheckEntryDetails({ entry }: { entry: HealthCheckEntry }) {
  const getHealthCheckRatingIcon = (rating: string) => {
    switch (rating) {
      case '0':
        return <Heart className="h-4 w-4 text-green-500 fill-green-500" />;
      case '1':
        return <Heart className="h-4 w-4 text-yellow-500 fill-yellow-500" />;
      case '2':
        return <Heart className="h-4 w-4 text-red-500 fill-red-500" />;
      case '3':
        return <Heart className="h-4 w-4 text-gray-500 fill-gray-500" />;
      default:
        return null;
    }
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <HeartPulse className="h-4 w-4 text-gray-500" />
        <p className="text-base text-gray-700 flex items-center gap-2">
          Health check rating:{' '}
          {getHealthCheckRatingIcon(entry.healthCheckRating.toString())}
        </p>
        {entry.healthCheckRating === '0' && (
          <p className="text-base font-medium text-gray-700">Healthy</p>
        )}
        {entry.healthCheckRating === '1' && (
          <p className="text-base font-medium text-gray-700">Low Risk</p>
        )}
        {entry.healthCheckRating === '2' && (
          <p className="text-base font-medium text-gray-700">High Risk</p>
        )}
        {entry.healthCheckRating === '3' && (
          <p className="text-base font-medium text-gray-700">Critical Risk</p>
        )}
      </div>
    </div>
  );
}

export default EntriesInfo;
