import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(Auth.me());

  useEffect(() => {
    // In case token exists in localStorage, keep user logged in
    setUser(Auth.me());
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await Auth.login(email, password);
    setUser(loggedInUser);
  };

  const register = async (payload) => {
    const newUser = await Auth.register(payload);
    setUser(newUser);
  };

  const logout = () => {
    Auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
