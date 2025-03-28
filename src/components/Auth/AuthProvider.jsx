import { createContext, useContext, useState } from "react"

export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (username, password) => {
    if (username === 'admin' && password === 'jawadsaleem') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  const logout = () => {
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
