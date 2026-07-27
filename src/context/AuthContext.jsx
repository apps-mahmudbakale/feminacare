import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMeDoctor } from '../api/xano';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('fc_token');
    if (token) {
      getMeDoctor()
        .then((res) => setDoctor(res.data))
        .catch(() => localStorage.removeItem('fc_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, doctorData) => {
    localStorage.setItem('fc_token', token);
    setDoctor(doctorData);
  };

  const logout = () => {
    localStorage.removeItem('fc_token');
    setDoctor(null);
  };

  return (
    <AuthContext.Provider value={{ doctor, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
