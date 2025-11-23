import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.tsx';
import { ThemeProvider } from './components/teme-provider.tsx';
import { AuthProvider } from './services/AuthProvider.tsx'; // <--- importar AuthProvider
import { AlertProvider } from './services/AlertProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AlertProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
