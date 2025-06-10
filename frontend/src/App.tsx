import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/main-layout';
import PatientList from './pages/patient-list';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<PatientList />} />
      </Route>
    </Routes>
  );
}

export default App;
