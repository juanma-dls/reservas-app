import Home from './HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layouts/mainLayout';
import Dashboard from './Dashboard';
import RootRedirect from '@/components/root-redirect';
import { PrivateRoute, PublicRoute } from './ProtectRoutes';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import { NotFoundPage } from './NotFoundPage';
import UsersPage from './users/UsersPage';
import PrivateHomePage from './PrivateHomePage';
import UserShowPage from './users/UsersShowPage';
import { UserCreatePage } from './users/UserCreatePage';
import { UserEditPage } from './users/UserEditPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RootRedirect />} />
          <Route
            path="home"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<PrivateHomePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/create" element={<UserCreatePage />} />
            <Route path="users/:id" element={<UserShowPage />} />
            <Route path="users/:id/edit" element={<UserEditPage />} />
            <Route path="/profile" element={<UserShowPage isProfile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
