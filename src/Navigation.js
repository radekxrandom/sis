import React, { useContext } from "react";
import "./App.css";
import Main from "./containers/Main";
import AppContext from "./AppContext";
import AuthContainer from "./containers/AuthContainer";

const Navigation = React.memo(props => {
  const [auth, setAuth] = useContext(AppContext);

  if (auth === "main") {
    return <Main openAlert={props.openAlert} />;
  } else {
    return <AuthContainer openAlert={props.openAlert} />;
  }
});

export default Navigation;
