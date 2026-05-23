import React, { createContext, useState, useContext } from "react";

const ResetCodeContext = createContext();

export const ResetCodeProvider = ({ children }) => {
  const [resetCode, setResetCode] = useState(null);
  const [resetEmail, setResetEmail] = useState(null);

  return (
    <ResetCodeContext.Provider
      value={{ resetCode, setResetCode, resetEmail, setResetEmail }}
    >
      {children}
    </ResetCodeContext.Provider>
  );
};

export const useResetCode = () => useContext(ResetCodeContext);
