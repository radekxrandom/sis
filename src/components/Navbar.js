import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import AppContext from "../AppContext";
import { mainAxios } from "../axios/config";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = props => {
  const classes = useStyles();
  const [auth, setAuth] = useContext(AppContext);
  const logout = () => {
    mainAxios.post("api/v1/auth/logout").then(pos => {
      localStorage.clear();
      setAuth("auth");
      console.log(pos);
    });
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={`navbar ${classes.title}`}>
            The greatest website
          </Typography>
          <Button
            className="bts"
            style={{ marginLeft: "0.5%" }}
            variant="outlined"
            onClick={logout}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
