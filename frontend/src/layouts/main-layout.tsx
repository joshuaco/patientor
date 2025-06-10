import { Outlet } from 'react-router';
import { Activity } from 'lucide-react';

const MainLayout = () => {
  return (
    <>
      <header className="bg-gray-100">
        <div className="flex justify-between items-center py-4 px-6 lg:px-12 xl:px-0 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Activity size={24} className="text-blue-500" />
            <h1 className="text-2xl font-semibold text-gray-800">Patientor</h1>
          </div>
          <nav></nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto pt-8 px-6 lg:px-12 xl:px-0">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
