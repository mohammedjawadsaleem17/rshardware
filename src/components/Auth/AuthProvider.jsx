import { createContext, useContext, useState } from "react"

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [id, setId] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (username, password) => {
    if (username === 'rshardware' && password === 'fahad@1436') {
      // if (true) {
      setId(username);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, id }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
