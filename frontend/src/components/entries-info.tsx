import {
  Calendar,
  ClipboardList,
  FileText,
  HeartPulse,
  Stethoscope,
  BriefcaseBusiness,
  Heart,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDiagnoses } from '@/services/diagnoses';
import { deleteEntry } from '@/services/entries';
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

  const params = useParams();
  const patientId = params.id as string;

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await getDiagnoses();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const handleDeleteEntry = async (entryId: string) => {
    if (!patientId) return;
    try {
      await deleteEntry(patientId, entryId);
      setPatient((prev) =>
        prev
          ? { ...prev, entries: prev.entries.filter((e) => e.id !== entryId) }
          : null
      );
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const getEntryTypeIcon = (type: string) => {
    switch (type) {
      case 'Hospital':
        return <Heart className="h-5 w-5 text-medical-primary" />;
      case 'OccupationalHealthcare':
        return <BriefcaseBusiness className="h-5 w-5 text-medical-primary" />;
      case 'HealthCheck':
        return <HeartPulse className="h-5 w-5 text-medical-primary" />;
      default:
        return <Stethoscope className="h-5 w-5 text-medical-primary" />;
    }
  };

  const getEntryTypeLabel = (type: string) => {
    switch (type) {
      case 'Hospital':
        return 'Hospital Visit';
      case 'OccupationalHealthcare':
        return 'Occupational Healthcare';
      case 'HealthCheck':
        return 'Health Check';
      default:
        return 'Medical Entry';
    }
  };

  return (
    <div className="mt-8 bg-medical-background min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-medical-border p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-medical-primary/10 to-medical-primary/20 rounded-xl flex items-center justify-center shadow-sm">
              <HeartPulse className="h-7 w-7 text-medical-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-medical-text-primary">
                Medical Entries
              </h2>
              <p className="text-medical-text-secondary text-sm mt-1">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}{' '}
                recorded
              </p>
            </div>
          </div>
          <button
            className="bg-medical-primary text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-medical-primary-dark transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-5 w-5" />
            Add New Entry
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto p-6">
        {entries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-medical-border p-12">
            <div className="flex flex-col items-center justify-center text-medical-text-secondary">
              <FileText className="h-16 w-16 mb-6 text-medical-primary/30" />
              <h3 className="text-xl font-medium text-medical-text-primary mb-2">
                No Medical Entries
              </h3>
              <p className="text-medical-text-secondary">
                Start by adding the first medical entry for this patient.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-medical-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Entry Header */}
                <div className="bg-medical-background/30 px-6 py-4 border-b border-gray-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getEntryTypeIcon(entry.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-medical-text-primary">
                          {getEntryTypeLabel(entry.type)}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-medical-primary" />
                          <span className="text-medical-text-secondary font-medium">
                            {entry.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                      title="Delete entry"
                    >
                      <Trash2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Entry Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-medical-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-medical-text-primary mb-1">
                        Description
                      </h4>
                      <p className="text-medical-text-secondary leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>

                  {/* Entry Details */}
                  <EntryDetails entry={entry} />

                  {/* Diagnosis Codes */}
                  {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <DiagnosisInfo
                      diagnosisCodes={entry.diagnosisCodes}
                      diagnoses={diagnoses}
                    />
                  )}

                  {/* Specialist */}
                  <div className="flex items-center gap-3 pt-2">
                    <Stethoscope className="h-5 w-5 text-medical-primary" />
                    <div>
                      <span className="text-sm text-medical-text-secondary">
                        Attending Physician:
                      </span>
                      <span className="ml-2 font-medium text-medical-text-primary">
                        Dr. {entry.specialist}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} title="Add New Medical Entry">
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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ClipboardList className="h-5 w-5 text-medical-primary" />
        <h4 className="text-sm font-medium text-medical-text-primary">
          Diagnosis Codes
        </h4>
      </div>

      <div className="grid gap-3">
        {diagnosisCodes.map((code) => (
          <div
            key={code}
            className="bg-medical-primary/5 border border-gray-300 rounded-lg p-4 hover:bg-medical-primary/10 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-medical-primary-light text-white">
                {code}
              </span>
              <p className="text-medical-text-secondary flex-1 leading-relaxed">
                {getDiagnoseName(code) || 'Diagnosis name not available'}
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
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-medical-primary" />
        <div>
          <h4 className="text-sm font-medium text-medical-text-primary mb-1">
            Discharge Information
          </h4>
          <p className="text-medical-text-secondary">
            <span className="font-medium">Date:</span> {entry.discharge.date}
          </p>
          <p className="text-medical-text-secondary">
            <span className="font-medium">Criteria:</span>{' '}
            {entry.discharge.criteria}
          </p>
        </div>
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
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <BriefcaseBusiness className="h-5 w-5 text-medical-primary" />
        <div>
          <h4 className="text-sm font-medium text-medical-text-primary mb-1">
            Employer Information
          </h4>
          <p className="text-medical-text-secondary">
            <span className="font-medium">Company:</span> {entry.employerName}
          </p>
        </div>
      </div>
      {entry.sickLeave && (
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-medical-primary" />
          <div>
            <h4 className="text-sm font-medium text-medical-text-primary mb-1">
              Sick Leave Period
            </h4>
            <p className="text-medical-text-secondary">
              <span className="font-medium">From:</span>{' '}
              {entry.sickLeave.startDate}
              <span className="mx-2">•</span>
              <span className="font-medium">To:</span> {entry.sickLeave.endDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function HealthCheckEntryDetails({ entry }: { entry: HealthCheckEntry }) {
  const getHealthCheckRating = (rating: number) => {
    switch (rating) {
      case 0:
        return {
          label: 'Excellent Health',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          icon: <Heart className="h-4 w-4 text-emerald-600 fill-emerald-600" />,
        };
      case 1:
        return {
          label: 'Good Health',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: <Heart className="h-4 w-4 text-green-600 fill-green-600" />,
        };
      case 2:
        return {
          label: 'Moderate Risk',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: <Heart className="h-4 w-4 text-yellow-600 fill-yellow-600" />,
        };
      case 3:
        return {
          label: 'High Risk',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          icon: <Heart className="h-4 w-4 text-red-600 fill-red-600" />,
        };
      default:
        return {
          label: 'Unknown',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: <Heart className="h-4 w-4 text-gray-600" />,
        };
    }
  };

  const rating = getHealthCheckRating(Number(entry.healthCheckRating));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <HeartPulse className="h-5 w-5 text-medical-primary" />
        <div>
          <h4 className="text-sm font-medium text-medical-text-primary mb-2">
            Health Assessment
          </h4>
          <div
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${rating.bgColor}`}
          >
            {rating.icon}
            <span className={`font-medium ${rating.color}`}>
              {rating.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntriesInfo;
