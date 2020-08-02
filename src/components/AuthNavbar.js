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

const AuthNavbar = props => {
  const classes = useStyles();
  const [auth, setAuth] = useContext(AppContext);
  const logout = async () => {
    //const post = await mainAxios.post("/auth/logout");
    fetch("https://recruit.sciencein.software/auth/logout", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYW5kb21pcyIsImV4cCI6MTU5NjQwOTE1OSwicm9sZXMiOlsiVVNFUiJdLCJsb2dpbiI6InJhbmRvbUBwaWVzLmNvbSJ9.Z6regaR6SN24lCxgPDyZ6cKrPt39UOH6ajKkIcfEE5Y",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      referrer: "http://localhost:3000/",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "POST",
      mode: "cors",
      credentials: "include"
    }).then(post => {
      localStorage.clear();
      setAuth("auth");
      console.log(post);
    });
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Raleway"
              }}
              to="/"
            >
              The greatest website
            </Link>
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

export default AuthNavbar;
