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
    
    return (
      <AuthContext.Provider value={{ user, setUser, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export { AuthContext, AuthProvider };
