import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in via localStorage
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
    
    if (userInfo) {
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password, name) => {
    try {
      const { data } = await api.post('/users', { name, email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { data, error: null };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return { data: null, error: new Error(message) };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { data, error: null };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return { data: null, error: new Error(message) };
    }
  };

  const signOut = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
