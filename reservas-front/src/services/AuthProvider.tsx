import type { User } from '@/types/user';
import { createContext, useState, type ReactNode } from 'react';

// Ahora AuthContext también se exporta para ser usado en el nuevo hook
export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const readUserFromStorage = (): User | null => {
  const stored = localStorage.getItem('user');
  
  if (!stored || stored === 'undefined') {
    localStorage.removeItem('user'); // Limpia la clave inválida
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch (e) {
    console.error('Error parsing user data from localStorage:', e);
    localStorage.removeItem('user'); // Limpia si el JSON está corrupto
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null,
  );
  const [user, setUser] = useState<User | null>(readUserFromStorage());

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = (onRedirect?: () => void) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    onRedirect?.();
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
