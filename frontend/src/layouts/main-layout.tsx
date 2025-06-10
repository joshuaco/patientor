import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <>
      <header className="bg-gray-100">
        <div className="flex justify-between items-center py-4 px-6 lg:px-12 xl:px-0 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Patientor</h1>
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
