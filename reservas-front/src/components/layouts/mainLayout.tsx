import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};
 
export default MainLayout;