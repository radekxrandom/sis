import React, { useState } from "react";
import "./App.css";
import AppContext from "./AppContext";
import Navigation from "./containers/Navigation";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setToken } from "./axios/config";

if (localStorage.getItem("authToken")) {
  const token = localStorage.getItem("authToken");
  setToken(token);
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const App = () => {
  //if val = authUser go to mainpage, else go to registration and login
  const auth = localStorage.getItem("authToken");
  const val = auth ? "authUser" : "anonUser";
  const context = useState(val);
  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    type: ""
  });
  //no dependency array so useCallback seems like a good option
  const openAlert = React.useCallback((msg, type) => {
    setAlert({
      open: true,
      msg,
      type
    });
  }, []);

  const closeAlert = () => {
    setAlert({
      open: false,
      msg: "",
      type: ""
    });
  };
  return (
    <AppContext.Provider value={context}>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeAlert} severity={alert.type}>
          {alert.msg}
        </Alert>
      </Snackbar>
      <Navigation openAlert={openAlert} />
    </AppContext.Provider>
  );
};

export default App;
