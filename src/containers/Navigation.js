import React, { useContext } from "react";
import Main from "./Main";
import AppContext from "../AppContext";
import AuthContainer from "./AuthContainer";
import { AuthContextProvider } from "./AuthContext";

const Navigation = React.memo(props => {
  const [auth, setAuth] = useContext(AppContext);

  if (auth === "authUser") {
    return <Main openAlert={props.openAlert} />;
  } else {
    return (
      <AuthContextProvider>
        <AuthContainer openAlert={props.openAlert} />
      </AuthContextProvider>
    );
  }
});

export default Navigation;
