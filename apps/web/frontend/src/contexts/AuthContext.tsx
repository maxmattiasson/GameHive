import { createContext, useState, useEffect } from "react";

type User = {
    _id: string;
    username: string;
    email: string;
    role: string;
} | null;

type AuthContextType= {
    user: User;
    setUser: (user: User) => void;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null >(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/api/auth/me", {
            credentials: "include",
          })
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                credentials: "include",
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
