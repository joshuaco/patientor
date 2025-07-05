import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router';
import { createEntry } from '@/services/entries';
import type { Diagnose, NewEntry, Patient } from '@/types/patient';

interface AddEntryFormProps {
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: Diagnose[];
  onClose: () => void;
}

function AddEntryForm({ setPatient, diagnoses, onClose }: AddEntryFormProps) {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewEntry>();

  const type = watch('type');

  // Retrieve patientId from URL
  const params = useParams();
  const patientId = params.id as string;

  const onSubmit: SubmitHandler<NewEntry> = async (data) => {
    // Ensure diagnosisCodes is set as array
    const formData = {
      ...data,
      diagnosisCodes: selectedDiagnoses.length > 0 ? selectedDiagnoses : [],
    };
    console.log(formData);

    try {
      const newEntry = await createEntry(patientId, formData);
      setPatient((prev) =>
        prev ? { ...prev, entries: [...prev.entries, newEntry] } : null
      );
      onClose();
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const handleDiagnosisChange = (code: string) => {
    setSelectedDiagnoses((prev) => {
      const isSelected = prev.includes(code);
      const newSelection = isSelected
        ? prev.filter((c) => c !== code)
        : [...prev, code];

      // Update react-hook-form value
      setValue('diagnosisCodes', newSelection.length > 0 ? newSelection : []);
      return newSelection;
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date *
          </label>
          <input
            type="date"
            id="date"
            {...register('date', {
              required: 'Date is required',
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description *
          </label>
          <input
            type="text"
            id="description"
            {...register('description', {
              required: 'Description is required',
              minLength: {
                value: 5,
                message: 'Description must be at least 5 characters long',
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="specialist"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Specialist *
          </label>
          <input
            type="text"
            id="specialist"
            {...register('specialist', {
              required: 'Specialist is required',
              minLength: {
                value: 2,
                message: 'Specialist name must be at least 2 characters long',
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.specialist ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.specialist && (
            <p className="mt-1 text-sm text-red-600">
              {errors.specialist.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="diagnosisCodes"
            className="block text-sm font-medium text-gray-700 mb-1 relative"
          >
            Diagnosis Codes (optional){' '}
            <span className="text-xs text-gray-500"> Click to show</span>
          </label>
          <input
            type="checkbox"
            name="diagnosisCodes"
            id="diagnosisCodes"
            className="hidden peer"
          />
          <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2 hidden peer-checked:block">
            {diagnoses.map((diagnosis) => (
              <label
                key={diagnosis.code}
                className="flex items-center space-x-2 py-1 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedDiagnoses.includes(diagnosis.code)}
                  onChange={() => handleDiagnosisChange(diagnosis.code)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">
                  {diagnosis.code} - {diagnosis.name}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Selected: {selectedDiagnoses.length} diagnosis code(s)
          </p>
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type *
          </label>
          <select
            id="type"
            {...register('type', {
              required: 'Type is required',
              validate: (value) => {
                if (value === undefined || value === null || !value) {
                  return 'Please select a valid entry type';
                }
                return true;
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.type ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Type</option>
            <option value="HealthCheck">Health Check</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">
              Occupational Healthcare
            </option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
        {type === 'HealthCheck' && (
          <div>
            <label
              htmlFor="healthCheckRating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Health Check Rating *
            </label>
            <select
              id="healthCheckRating"
              {...register('healthCheckRating', {
                required: 'Health Check Rating is required',
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            >
              <option value="">Select Rating</option>
              <option value="0">Healthy</option>
              <option value="1">Low Risk</option>
              <option value="2">High Risk</option>
              <option value="3">Critical Risk</option>
            </select>
          </div>
        )}
        {type === 'Hospital' && (
          <>
            <div>
              <label
                htmlFor="dischargeDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discharge Date
              </label>
              <input
                type="date"
                id="dischargeDate"
                name="dischargeDate"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
              />
            </div>
            <div>
              <label
                htmlFor="dischargeCriteria"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discharge Criteria
              </label>
              <input
                type="text"
                id="dischargeCriteria"
                name="dischargeCriteria"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
              />
            </div>
          </>
        )}
        {type === 'OccupationalHealthcare' && (
          <div>
            <label
              htmlFor="employerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employer Name
            </label>
            <input
              type="text"
              id="employerName"
              {...register('employerName', {
                required: 'Employer Name is required',
                minLength: {
                  value: 2,
                  message: 'Employer Name must be at least 2 characters long',
                },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            />
          </div>
        )}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Entry
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedDiagnoses([]);
              setValue('diagnosisCodes', undefined);
            }}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEntryForm;
