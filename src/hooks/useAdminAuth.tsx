import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { AdminCredentials, AdminSession } from "@/types/admin";

interface AdminAuthContextValue {
  admin: AdminSession | null;
  isAuthenticated: boolean;
  login: (credentials: AdminCredentials) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const SESSION_KEY = "gmg-admin-session";
const DEFAULT_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || "admin";
const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminSession | null>(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as AdminSession) : null;
  });

  const login = ({ username, password }: AdminCredentials) => {
    const normalizedUsername = username.trim();

    if (normalizedUsername !== DEFAULT_USERNAME || password !== DEFAULT_PASSWORD) {
      throw new Error("Invalid admin credentials");
    }

    const session: AdminSession = {
      username: normalizedUsername,
      loggedInAt: new Date().toISOString(),
    };

    setAdmin(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin),
      login,
      logout,
    }),
    [admin],
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
