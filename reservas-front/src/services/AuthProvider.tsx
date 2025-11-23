import type { User } from '@/types/user';
import { createContext, useState, type ReactNode } from 'react';
import { useAlert } from './AlertProvider';

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoggingOut: boolean;
  login: (token: string, user: User) => void;
  logout: (onRedirect?: () => void) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readUserFromStorage = (): User | null => {
  const stored = localStorage.getItem('user');

  if (!stored || stored === 'undefined') {
    localStorage.removeItem('user');
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch (e) {
    console.error('Error parsing user:', e);
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setAlert } = useAlert();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  );
  const [user, setUser] = useState<User | null>(readUserFromStorage());

  // Nueva bandera para evitar alertas falsas en PrivateRoute
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);

    setAlert({
      type: 'success',
      title: 'Ha iniciado sesión',
      message: `Bienvenido ${userData.name} ${userData.lastname}`,
      duration: 3000,
    });
  };

  const logout = (onRedirect?: () => void) => {
    setIsLoggingOut(true);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setToken(null);
    setUser(null);

    setAlert({
      type: 'success',
      title: "Sesión cerrada",
      message: "¡Hasta la próxima!",
      duration: 3000,
    });

    if (typeof onRedirect === 'function') onRedirect();

    setTimeout(() => setIsLoggingOut(false), 2000);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoggingOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
