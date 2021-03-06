import React from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import TextInput from "../blocks/TextInput";
import useFormFields from "../customHooks/formHook";
import useSubmitHook from "../customHooks/useSubmitHook";
import useAuthNav from "../customHooks/useAuthNav";

const fieldNames = [
  "login",
  "email",
  "regPassword",
  "confirmPassword",
  "policyCheckbox"
];

const containsErrors = (state, fieldNames) => {
  const err = fieldNames.map(el =>
    !state[el] || state.err[el] ? true : false
  );
  return err.includes(true);
};

const Register = props => {
  const { 3: navigateAuth } = useAuthNav();
  //const [, , , navigateAuth] = useAuthNav();
  const [animation, submit, displayErrAlert] = useSubmitHook(props.openAlert);
  const [state, handleInput] = useFormFields({
    login: "",
    email: "",
    regPassword: "",
    confirmPassword: "",
    policyCheckbox: "",
    err: {}
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (containsErrors(state, fieldNames)) {
      //btn disabled albeit one could still try submiting
      //invalid form by pressing enter
      displayErrAlert("Popraw błędy");
      return false;
    }
    const { login, regPassword, email } = state;
    const form = {
      login,
      password: regPassword,
      email
    };
    const post = await submit("post", "api/v1/registration/user", form);
    if (post) {
      props.openAlert("Rejestracja pomyślna", "success");
      navigateAuth(1);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs" className={`${animation}`}>
        <CssBaseline />
        <div className="flexColumnCenter">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form data-submit="register" onSubmit={handleSubmit}>
            <TextInput
              handleInput={handleInput}
              name="login"
              label="Login"
              err={state.err.login}
            />
            <TextInput
              handleInput={handleInput}
              name="email"
              label="Email"
              err={state.err.email}
            />
            <TextInput
              handleInput={handleInput}
              name="regPassword"
              label="Hasło"
              type="password"
              err={state.err.regPassword}
            />
            <TextInput
              handleInput={handleInput}
              name="confirmPassword"
              label="Powtórz hasło"
              type="password"
              err={state.err.confirmPassword}
            />
            <Tooltip
              arrow
              placement="top-end"
              disableFocusListener
              title="Tak naprawde to nie ma żadnego regulaminu"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    onChange={handleInput}
                    name="policyCheckbox"
                    value="policyCheckbox"
                    color="primary"
                  />
                }
                label="Akceptuję regulamin *"
              />
            </Tooltip>
            <Button
              type="submit"
              fullWidth
              //pass the return value of function
              //not the function itself
              //although i am still not sure if
              /*{()=> {containsErrors(state, fieldNames)}}*/
              //isnt be correct way
              disabled={containsErrors(state, fieldNames)}
              variant="contained"
              color="primary"
              className="submitBtn"
            >
              Register
            </Button>
            <Grid container className="submitBtn">
              <Grid item xs>
                <Link variant="body2" data-location={1} onClick={navigateAuth}>
                  Masz już konto? Kliknij tu by przejść na strone logowania.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Register;
