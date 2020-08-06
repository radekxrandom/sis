import React from "react";
import { AuthContextProvider } from "./AuthContext";
import AuthContainer from "./AuthContainer";

const AuthWrap = props => {
  return (
    <AuthContextProvider>
      <AuthContainer openAlert={props.openAlert} />
    </AuthContextProvider>
  );
};

export default AuthWrap;
