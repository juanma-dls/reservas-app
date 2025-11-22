import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};
 
export default MainLayout;