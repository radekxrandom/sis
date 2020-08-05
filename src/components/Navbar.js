import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppContext from "../AppContext";
import { mainAxios } from "../axios/config";

const Navbar = props => {
  const [auth, setAuth] = useContext(AppContext);
  const logout = () => {
    mainAxios.post("api/v1/auth/logout").then(pos => {
      localStorage.clear();
      setAuth("anonUser");
      console.log(pos);
    });
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="navbar navTitle">
            The greatest website
          </Typography>
          <Button className="bts" variant="outlined" onClick={logout}>
            Wyloguj
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
