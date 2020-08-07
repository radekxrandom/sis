import React, { useContext } from "react";
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
import AppContext from "../contexts/AppContext";
import TextInput from "../blocks/TextInput";
import useFormFields from "../customHooks/formHook";
import useSubmitHook from "../customHooks/useSubmitHook";
import { setToken } from "../axios/config";
import useAuthNav from "../customHooks/useAuthNav";

const fieldNames = ["login", "password"];

const containsErrors = (state, fieldNames) => {
  const err = fieldNames.map(el =>
    !state[el] || state.err[el] ? true : false
  );
  return err.includes(true);
};

const Login = props => {
  //const [auth, setAuth] = useContext(AppContext);
  const { 1: setAuth } = useContext(AppContext);
  //const [animation, setAnimation] = useState("");
  const [animation, submit, displayErrAlert] = useSubmitHook(props.openAlert);
  const [state, handleInput] = useFormFields({
    login: "",
    password: "",
    saveLogin: true,
    err: {}
  });
  //const [, , , navigateAuth] = useAuthNav();
  const { 3: navigateAuth } = useAuthNav();
  const handleSubmit = async e => {
    e.preventDefault();
    if (containsErrors(state, fieldNames)) {
      //btn disabled albeit one could still try to submit
      //invalid form by pressing enter
      displayErrAlert("Popraw błędy");
      return false;
    }
    const { login, password, saveLogin } = state;
    const form = {
      login,
      password
    };
    const post = await submit("post", "api/v1/auth/login", form);
    if (post) {
      saveLogin && localStorage.setItem("authToken", post.data.accessToken);
      props.openAlert("Zalogowano", "success");
      setToken(post.data.accessToken);
      setAuth("authUser");
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
                  defaultChecked
                />
              }
              label="Zapamiętaj logowanie"
            />
            <Button
              type="submit"
              fullWidth
              //pass the return value of function
              //not the function itself
              //although i am still not sure if
              /*{()=> {containsErrors(state, fieldNames)}}*/
              //isnt be correct way
              disabled={containsErrors(state, fieldNames)}
              className="submitBtn"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Grid container className="submitBtn">
              <Grid item xs>
                <Link variant="body2" data-location={0} onClick={navigateAuth}>
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
