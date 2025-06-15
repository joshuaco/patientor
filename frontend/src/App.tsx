import { Route, Routes } from 'react-router';
import MainLayout from '@/layouts/main-layout';
import Home from '@/pages/home';
import PatientInfo from '@/pages/patient-info';

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
