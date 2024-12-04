// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getUser, loginUser, logoutUser } from "./networking/auth";
import { User } from "./interfaces";

axios.defaults.withCredentials = true;

const defaultUser: User = {
    _id: "",
    username: "",
    email: "",
    };

export const AuthContext = createContext<{
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}>({
    user: defaultUser,
    login: () => {},
    logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    getUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = (username:string , password:string) => {
    loginUser(username, password).then((data) => {
        setUser(data.user);
        }
    )
  };

  const logout = () => {
    logoutUser().then(() => {
        setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
