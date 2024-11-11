// UserContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  // Các trường khác của user nếu cần
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  isLoading: boolean;
}

const defaultContextValue: UserContextType = {
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isLoading: true
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      // Fetch user info or validate token if needed
    } catch (error) {
      Cookies.remove('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 7 });
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    try {
      const response = await api.post('/auth/register', { email, password, name, role });
      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 7 });
      setUser(user);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
