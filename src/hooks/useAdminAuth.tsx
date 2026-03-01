import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface AdminUser {
  username: string;
  role?: string;
}

interface AdminAuthContextValue {
  token: string | null;
  admin: AdminUser | null;
  login: (token: string, adminData?: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const TOKEN_KEY = "gmg-admin-token";
const ADMIN_KEY = "gmg-admin-profile";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem(ADMIN_KEY);
    return stored ? (JSON.parse(stored) as AdminUser) : null;
  });

  const login = (newToken: string, adminData?: AdminUser) => {
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);

    if (adminData) {
      setAdmin(adminData);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(adminData));
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  };

  const value = useMemo(
    () => ({ token, admin, login, logout }),
    [token, admin],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
