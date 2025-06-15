import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/main-layout';
import PatientInfo from '@/pages/patient-info';
import Home from '@/pages/home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/patients/:id" element={<PatientInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
