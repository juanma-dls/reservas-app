import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layouts/mainLayout';
import { AuthProvider } from '@/services/AuthProvider';
import Dashboard from './Dashboard';
import RootRedirect from '@/components/root-redirect';
import { PrivateRoute, PublicRoute } from './ProtectRoutes';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import { NotFoundPage } from './NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Ruta raíz que redirige según login */}
            <Route index element={<RootRedirect />} />
            <Route
              path="home"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>}
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
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
