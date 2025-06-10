function PatientList() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Patient List</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
          Add Patient
        </button>
      </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occupation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health Rating
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="divide-x divide-gray-200">
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">Male</td>
              <td className="px-6 py-4 whitespace-nowrap">Software Engineer</td>
              <td className="px-6 py-4 whitespace-nowrap">10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PatientList;
