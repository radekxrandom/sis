import React, { useState, useEffect } from "react";
import "./App.css";
import AppContext from "./AppContext";
import Navigation from "./Navigation";
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
  const auth = localStorage.getItem("authToken");
  const val = auth ? "main" : "auth";
  const cont = useState(val);
  const [alert, setAlert] = useState({
    open: false,
    msg: "",
    type: ""
  });
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
    <AppContext.Provider value={cont}>
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
