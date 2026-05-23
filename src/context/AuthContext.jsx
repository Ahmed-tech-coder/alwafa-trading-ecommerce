import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userName, setUserName] = useState(() => localStorage.getItem("userName"));
  const [id, setId] = useState(() => localStorage.getItem("id"));
  const [userType, setUserType] = useState(() => localStorage.getItem("userType")); // 0 or 1

  const login = (newToken, newUserName, newId, newUserType) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", newUserName);
    localStorage.setItem("id", newId);
    localStorage.setItem("userType", newUserType); // store as number

    setToken(newToken);
    setUserName(newUserName);
    setId(newId);
    setUserType(newUserType);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("id");
    localStorage.removeItem("userType");

    setToken(null);
    setUserName(null);
    setId(null);
    setUserType(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");
    const storedId = localStorage.getItem("id");
    const storedUserType = localStorage.getItem("userType");

    if (storedToken) setToken(storedToken);
    if (storedUserName) setUserName(storedUserName);
    if (storedId) setId(storedId);
    if (storedUserType) setUserType(storedUserType);
  }, []);

  const isAdmin = userType === "1"; // since localStorage stores as string

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        id,
        userType,     // raw value: 0 or 1 (string)
        isAdmin,      // boolean
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
