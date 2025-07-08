import { Route, Routes } from 'react-router';
import MainLayout from '@/components/layouts/main-layout';
import PatientInfo from '@/pages/patients/patient-info';
import Home from '@/pages/home';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/patients/:id" element={<PatientInfo />} />
      </Route>
    </Routes>
  );
}

export default Router;
