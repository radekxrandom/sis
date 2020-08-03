import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import AppContext from "../AppContext";
import TextInput from "../blocks/TextInput";
import { setToken } from "../axios/config";

const fieldNames = ["login", "password"];

const checker = (state, fieldNames) => {
  const err = fieldNames.map(el =>
    !state[el] || state.err[el] ? true : false
  );
  return err.includes(true);
};

const Login = props => {
  const [auth, setAuth] = useContext(AppContext);
  const [shake, setShake] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    if (checker(props.state, fieldNames)) {
      props.openAlert("Popraw błędy", "info");
      setShake("shake-horizontal");
      setTimeout(() => setShake(""), 300);
      return false;
    }
    const { login, password, saveLogin } = props.state;
    const form = {
      login,
      password
    };
    try {
      const post = await props.submit("post", "api/v1/auth/login", form);
      //keep jwt token if user checked remember me box
      saveLogin && localStorage.setItem("authToken", post.data.accessToken);
      props.openAlert("Zalogowano", "success");
      setToken(post.data.accessToken);
      setAuth("main");
    } catch (err) {
      props.openAlert("Problem", "info");
      setShake("shake-horizontal");
      setTimeout(() => setShake(""), 300);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs" className={`${shake}`}>
        <CssBaseline />
        <div className="flexColumnCenter">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit} data-submit="login">
            <TextInput
              handleInput={props.handleInput}
              name="login"
              label="Login"
              err={props.state.err.login}
            />
            <TextInput
              handleInput={props.handleInput}
              name="password"
              label="Hasło"
              type="password"
              err={props.state.err.password}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="saveLogin"
                  onChange={props.handleInputWithoutValidation}
                  value="saveLogin"
                  color="primary"
                />
              }
              label="Zapamiętaj logowanie"
            />
            <Button
              type="submit"
              fullWidth
              disabled={checker(props.state, fieldNames)}
              className={`submitBtn`}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Grid container className="submitBtn">
              <Grid item xs>
                <Link
                  variant="body2"
                  data-location="register"
                  onClick={props.changeShown}
                >
                  Don't have an account? Register here.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
