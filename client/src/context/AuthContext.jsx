import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const saved = localStorage.getItem('careerflow-auth');
    return saved ? JSON.parse(saved) : { user: null, token: null };
  });

  useEffect(() => {
    localStorage.setItem('careerflow-auth', JSON.stringify(authState));
  }, [authState]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setAuthState({ user: data.user, token: data.token });
    return data;
  };

  const signup = async (payload) => {
    const data = await authService.signup(payload);
    setAuthState({ user: data.user, token: data.token });
    return data;
  };

  const logout = () => {
    setAuthState({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
