import { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/auth`;

type User = {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "dev";
  loginCount: number;
  userAchievements: string[];
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
