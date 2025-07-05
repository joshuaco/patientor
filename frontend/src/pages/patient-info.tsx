import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Venus,
  Mars,
  VenusAndMars,
  User,
  Briefcase,
  IdCard,
  Calendar,
  Heart,
  AlertCircle,
} from 'lucide-react';
import { getPatientById } from '@/services/patients';
import type { Patient } from '@/types/patient';

import EntriesInfo from '@/components/entries-info';

function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setIsLoading(true);
        const patient = await getPatientById(id as string);
        setPatient(patient);
      } catch (error) {
        console.error('Error fetching patient:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const getGenderIcon = (gender: string) => {
    if (gender === 'male')
      return <Mars className="text-medical-primary w-5 h-5" />;
    if (gender === 'female')
      return <Venus className="text-medical-primary w-5 h-5" />;
    return <VenusAndMars className="text-medical-primary w-5 h-5" />;
  };

  const getGenderLabel = (gender: string) => {
    if (gender === 'male') return 'Male';
    if (gender === 'female') return 'Female';
    return 'Other';
  };

  const calculateAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (isLoading) {
    return (
      <div className="bg-medical-background min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-medical-primary/20 rounded-full"></div>
            <div className="text-medical-text-secondary font-medium">
              Loading patient information...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-medical-background min-h-screen">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="w-16 h-16 text-red-500" />
            <div className="text-medical-text-primary font-medium">
              Patient not found
            </div>
            <p className="text-medical-text-secondary text-sm">
              Please check the patient ID and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-medical-background min-h-screen">
      {/* Patient Header */}
      <div className="bg-white shadow-sm border-b border-medical-border">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-medical-primary/10 to-medical-primary/20 rounded-2xl flex items-center justify-center shadow-sm">
              <User className="text-medical-primary w-10 h-10" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold text-medical-text-primary">
                  {patient.name}
                </h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-medical-primary/10 rounded-full">
                  {getGenderIcon(patient.gender)}
                  <span className="text-medical-text-primary font-medium text-sm">
                    {getGenderLabel(patient.gender)}
                  </span>
                </div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-medical-primary to-medical-primary-light rounded-full"></div>
              <p className="text-medical-text-secondary mt-3 text-lg">
                Patient ID:{' '}
                <span className="font-medium text-medical-text-primary">
                  {id}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Information Cards */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-medical-border p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-medical-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="text-medical-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-medical-text-primary">
                  Personal Information
                </h3>
                <p className="text-medical-text-secondary text-sm">
                  Basic demographic data
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-medical-text-secondary uppercase tracking-wider">
                  Date of Birth
                </label>
                <p className="text-medical-text-primary font-medium">
                  {patient.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-medical-text-secondary uppercase tracking-wider">
                  Age
                </label>
                <p className="text-medical-text-primary font-medium">
                  {calculateAge(patient.dateOfBirth)} years old
                </p>
              </div>
            </div>
          </div>

          {/* Identification */}
          <div className="bg-white rounded-xl shadow-sm border border-medical-border p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-medical-primary/10 rounded-lg flex items-center justify-center">
                <IdCard className="text-medical-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-medical-text-primary">
                  Identification
                </h3>
                <p className="text-medical-text-secondary text-sm">
                  Official identification number
                </p>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-medical-text-secondary uppercase tracking-wider">
                Social Security Number
              </label>
              <p className="text-lg font-mono font-semibold text-medical-text-primary bg-medical-background/50 px-3 py-2 rounded-lg mt-1">
                {patient.ssn}
              </p>
            </div>
          </div>

          {/* Occupation */}
          <div className="bg-white rounded-xl shadow-sm border border-medical-border p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-medical-primary/10 rounded-lg flex items-center justify-center">
                <Briefcase className="text-medical-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-medical-text-primary">
                  Occupation
                </h3>
                <p className="text-medical-text-secondary text-sm">
                  Professional background
                </p>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-medical-text-secondary uppercase tracking-wider">
                Current Position
              </label>
              <p className="text-lg font-medium text-medical-text-primary capitalize mt-1">
                {patient.occupation}
              </p>
            </div>
          </div>
        </div>

        {/* Medical Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-medical-border p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-medical-primary/10 rounded-lg flex items-center justify-center">
              <Heart className="text-medical-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-medical-text-primary">
                Medical Summary
              </h3>
              <p className="text-medical-text-secondary">
                Overview of patient's medical history
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-medical-background/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-medical-primary">
                {patient.entries.length}
              </p>
              <p className="text-medical-text-secondary text-sm font-medium">
                Total Entries
              </p>
            </div>
            <div className="bg-medical-background/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-medical-primary">
                {
                  patient.entries.filter(
                    (entry) => entry.type === 'HealthCheck'
                  ).length
                }
              </p>
              <p className="text-medical-text-secondary text-sm font-medium">
                Health Checks
              </p>
            </div>
            <div className="bg-medical-background/50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-medical-primary">
                {
                  patient.entries.filter((entry) => entry.type === 'Hospital')
                    .length
                }
              </p>
              <p className="text-medical-text-secondary text-sm font-medium">
                Hospital Visits
              </p>
            </div>
          </div>
        </div>

        {/* Entries Information */}
        <EntriesInfo entries={patient.entries} setPatient={setPatient} />
      </div>
    </div>
  );
}

export default PatientInfo;
