import React, { useContext } from "react";
import Main from "./Main";
import AppContext from "../contexts/AppContext";
import AuthContainer from "./AuthContainer";
import { AuthContextProvider } from "../contexts/AuthContext";

const Navigation = React.memo(props => {
  const [auth] = useContext(AppContext);

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
