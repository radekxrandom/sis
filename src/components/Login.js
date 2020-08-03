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
import { useFormFields } from "../formHook";
import { setToken } from "../axios/config";
import { mainAxios } from "../axios/config";

const fieldNames = ["login", "password"];

const containsErrors = (state, fieldNames) => {
  const err = fieldNames.map(el =>
    !state[el] || state.err[el] ? true : false
  );
  return err.includes(true);
};

const Login = props => {
  const [auth, setAuth] = useContext(AppContext);
  const [animation, setAnimation] = useState("");
  const [state, handleInput] = useFormFields({
    login: "",
    password: "",
    saveLogin: "",
    err: {}
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (containsErrors(state, fieldNames)) {
      props.openAlert("Popraw błędy", "info");
      setAnimation("shake-horizontal");
      setTimeout(() => setAnimation(""), 300);
      return false;
    }
    const { login, password, saveLogin } = state;
    const form = {
      login,
      password
    };
    try {
      const post = await mainAxios.post("api/v1/auth/login", form);
      //keep jwt token if user checked remember me box
      saveLogin && localStorage.setItem("authToken", post.data.accessToken);
      props.openAlert("Zalogowano", "success");
      setToken(post.data.accessToken);
      setAuth("main");
    } catch (err) {
      props.openAlert("Problem", "info");
      setAnimation("shake-horizontal");
      setTimeout(() => setAnimation(""), 300);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs" className={animation}>
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
              handleInput={handleInput}
              name="login"
              label="Login"
              err={state.err.login}
            />
            <TextInput
              handleInput={handleInput}
              name="password"
              label="Hasło"
              type="password"
              err={state.err.password}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="saveLogin"
                  onChange={handleInput}
                  value="saveLogin"
                  color="primary"
                />
              }
              label="Zapamiętaj logowanie"
            />
            <Button
              type="submit"
              fullWidth
              disabled={containsErrors(state, fieldNames)}
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
                  Nie masz jeszcze konta? Zarejestruj się.
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
