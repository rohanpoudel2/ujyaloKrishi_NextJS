import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || null
      : null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8008/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await axios.post("http://localhost:8008/api/auth/logout", null, {
      withCredentials: true,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem("user", null);
    }
    setCurrentUser(null);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
