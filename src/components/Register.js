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
import TextInput from "../blocks/TextInput";
import { mainAxios } from "../axios/config";
import { useFormFields } from "../formHook";

const fieldNames = ["login", "email", "regPassword", "confirmPassword"];

const checker = (state, fieldNames) => {
  const err = fieldNames.map(el =>
    !state[el] || state.err[el] ? true : false
  );
  return err.includes(true);
};

const Register = props => {
  const [shake, setShake] = React.useState("");
  const [state, handleInput] = useFormFields({
    login: "",
    email: "",
    regPassword: "",
    confirmPassword: "",
    err: {}
  });
  const handleSubmit = async e => {
    e.preventDefault();
    if (checker(state, fieldNames)) {
      props.openAlert("Popraw błędy", "info");
      return false;
    }
    const { login, regPassword, email } = state;
    const form = {
      login,
      password: regPassword,
      email
    };
    try {
      const post = await mainAxios.post("api/v1/registration/user", form);
      props.openAlert("Rejestracja pomyślna", "success");
      props.displayOtherForm("login", "register");
      props.setActiveStep(2);
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zaakceptuj regulamin"
            />
            <Button
              type="submit"
              fullWidth
              disabled={checker(state, fieldNames)}
              variant="contained"
              color="primary"
              className="submitBtn"
            >
              Register
            </Button>
            <Grid container className="submitBtn">
              <Grid item xs>
                <Link
                  variant="body2"
                  data-location="login"
                  onClick={props.changeShown}
                >
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
