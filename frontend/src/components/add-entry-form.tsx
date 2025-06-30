import { useState } from 'react';
import { useParams } from 'react-router';
import { createEntry } from '@/services/entries';
import type { Diagnose, NewEntry, Patient } from '@/types/patient';

interface AddEntryFormProps {
  diagnoses: Diagnose[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

function AddEntryForm({ setPatient }: AddEntryFormProps) {
  const [formData, setFormData] = useState<NewEntry>({} as NewEntry);
  const [errors, setErrors] = useState<Partial<Record<keyof NewEntry, string>>>(
    {}
  );

  // Retrieve patientId from URL
  const params = useParams();
  const patientId = params.id as string;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewEntry, string>> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.description || !formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.specialist || !formData.specialist.trim()) {
      newErrors.specialist = 'Specialist is required';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof NewEntry]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      try {
        const newEntry = await createEntry(patientId, formData);
        setPatient((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            entries: [...prev.entries, newEntry],
          };
        });
      } catch (error) {
        console.error('Error creating entry:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
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
            name="specialist"
            value={formData.specialist}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.specialist ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.specialist && (
            <p className="mt-1 text-sm text-red-600">{errors.specialist}</p>
          )}
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
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.type ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="" defaultChecked>
              Select Type
            </option>
            <option value="HealthCheck">Health Check</option>
            <option value="Hospital">Hospital</option>
            <option value="OccupationalHealthcare">
              Occupational Healthcare
            </option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type}</p>
          )}
        </div>
        {formData.type === 'HealthCheck' && (
          <div>
            <label
              htmlFor="healthCheckRating"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Health Check Rating *
            </label>
            <select
              id="healthCheckRating"
              name="healthCheckRating"
              value={formData.healthCheckRating}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Rating</option>
              <option value="0">Healthy</option>
              <option value="1">Low Risk</option>
              <option value="2">High Risk</option>
              <option value="3">Critical Risk</option>
            </select>
          </div>
        )}
        {formData.type === 'Hospital' && (
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
                value={formData.discharge?.date}
                onChange={handleChange}
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
                value={formData.discharge?.criteria}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
              />
            </div>
          </>
        )}
        {formData.type === 'OccupationalHealthcare' && (
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
              name="employerName"
              value={formData.employerName}
              onChange={handleChange}
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
