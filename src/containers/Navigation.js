import React, { useContext } from "react";
import Main from "./Main";
import AppContext from "../AppContext";
import AuthContainer from "./AuthContainer";

const Navigation = React.memo(props => {
  const [auth, setAuth] = useContext(AppContext);

  if (auth === "authUser") {
    return <Main openAlert={props.openAlert} />;
  } else {
    return <AuthContainer openAlert={props.openAlert} />;
  }
});

export default Navigation;
