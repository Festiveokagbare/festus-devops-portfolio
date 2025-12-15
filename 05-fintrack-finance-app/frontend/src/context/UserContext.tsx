// src/context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean; // ✅ Add loading to context type
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true, // ✅ Default loading state
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch((err) => {
        console.error("Error loading user:", err);
        localStorage.removeItem("token"); // Optional: clear token on failure
      })
      .finally(() => {
        setLoading(false); // ✅ Done loading
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
