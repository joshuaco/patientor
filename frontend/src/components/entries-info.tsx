import { useState, useEffect } from 'react';
import {
  Calendar,
  FileText,
  Stethoscope,
  ClipboardList,
  HeartPulse,
} from 'lucide-react';
import { getDiagnoses } from '@/services/diagnoses';
import type { Entry, Diagnose } from '@/types/patient';

interface EntriesInfoProps {
  entries: Entry[];
}

function EntriesInfo({ entries }: EntriesInfoProps) {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await getDiagnoses();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  const getDiagnoseName = (code: string) => {
    const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
    return diagnose?.name;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center">
          <HeartPulse className="h-6 w-6 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Medical Entries</h2>
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
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-base font-semibold text-gray-800">
                      {entry.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                    <p className="text-base text-gray-700 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>

                  {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-gray-500" />
                        <span className="text-base font-medium text-gray-700">
                          Diagnosis Codes
                        </span>
                      </div>

                      <div className="grid gap-3">
                        {entry.diagnosisCodes.map((code) => (
                          <div
                            key={code}
                            className="bg-blue-50 border border-blue-200 rounded-md p-4 hover:bg-blue-100 transition-colors duration-150"
                          >
                            <div className="flex items-start gap-3">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                                {code}
                              </span>
                              <p className="text-base text-gray-700 flex-1">
                                {getDiagnoseName(code) ||
                                  'Diagnosis name not found'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EntriesInfo;
