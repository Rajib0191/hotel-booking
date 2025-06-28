"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, UserContextType } from "@/types/user";

const defaultContextValue: UserContextType = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  isLogin: false,
  setIsLogin: () => {},
  isAdmin: false,
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  const login = (token: string) => {
    sessionStorage.setItem("token", token);
    setIsLogin(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setIsLogin(false);
  };

  const isAdmin = user?.role === "ADMIN";

  const isAuthenticated = !!user;

  const value = {
    user,
    setUser,
    isAuthenticated,
    login,
    logout,
    isLogin,
    setIsLogin,
    isAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
