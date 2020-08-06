import React, { useContext } from "react";
import Main from "./Main";
import AppContext from "../AppContext";
import AuthWrap from "./AuthWrap";
import AuthContainer from "./AuthContainer";

const Navigation = React.memo(props => {
  const [auth, setAuth] = useContext(AppContext);

  if (auth === "authUser") {
    return <Main openAlert={props.openAlert} />;
  } else {
    return <AuthWrap openAlert={props.openAlert} />;
  }
});

export default Navigation;
