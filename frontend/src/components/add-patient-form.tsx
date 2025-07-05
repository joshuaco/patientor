import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPatient } from '@/services/patients';
import { NewPatientSchema } from '@/schemas/patient-schema';
import type { Gender, NewPatient, PublicPatient } from '@/types/patient';

interface AddPatientFormProps {
  onClose: () => void;
  onCancel?: () => void;
  setPatients: React.Dispatch<React.SetStateAction<PublicPatient[]>>;
}

function AddPatientForm({
  onClose,
  onCancel,
  setPatients,
}: AddPatientFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewPatient>({
    resolver: zodResolver(NewPatientSchema),
    defaultValues: {
      name: '',
      dateOfBirth: '',
      ssn: '',
      gender: '' as Gender,
      occupation: '',
    },
  });

  const onSubmit = async (data: NewPatient) => {
    try {
      const newPatient = await createPatient(data);
      setPatients((prevPatients: PublicPatient[]) => [
        ...prevPatients,
        newPatient,
      ]);
      onClose();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register('dateOfBirth')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="ssn"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Social Security Number
          </label>
          <input
            type="text"
            id="ssn"
            {...register('ssn')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ssn ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="XXXXXX-XXXX"
          />
          {errors.ssn && (
            <p className="mt-1 text-sm text-red-600">{errors.ssn.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender *
          </label>
          <select
            id="gender"
            {...register('gender')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="occupation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Occupation *
          </label>
          <input
            type="text"
            id="occupation"
            {...register('occupation')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.occupation ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter occupation"
          />
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-600">
              {errors.occupation.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Adding...' : 'Add Patient'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddPatientForm;
