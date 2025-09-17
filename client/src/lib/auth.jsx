import React, { createContext, useContext, useMemo, useState } from "react";
import { Auth } from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(Auth.me());
  const value = useMemo(() => ({
    user,
    login: async (email, password) => setUser(await Auth.login(email, password)),
    register: async (payload) => setUser(await Auth.register(payload)),
    logout: () => { Auth.logout(); setUser(null); }
  }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
