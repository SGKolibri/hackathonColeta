import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  name: string | null;
  role: string | null;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  name: null,
  role: null,
  login: (userData: any) => {},
  logout: () => {},
  loading: true,
});

import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedName) {
      setToken(storedToken);
      setName(storedName);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  interface UserData {
    accessToken: string;
    data: {
      name: string;
      role: string;
    };
  }

  const login = (userData: UserData) => {
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("name", userData.data.name);
    localStorage.setItem("role", userData.data.role);
    setToken(userData.accessToken);
    setName(userData.data.name);

    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    setToken(null);
    setName(null);
  };
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, name, role, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
