import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    shown: "register",
    anims: "",
    activeStep: 1
  });
  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};
