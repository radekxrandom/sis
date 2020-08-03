import React, { useState, useCallback, Suspense } from "react";
import Login from "../components/Login";
//import Register from "../components/Register";
import Steps from "../components/Steps";
import withInput from "../withInput";
import Skeleton from "@material-ui/lab/Skeleton";

const Register = React.lazy(() => import("../components/Register"));
//const Login = React.lazy(() => import("../components/Login"));

const sleep = waitTimeInMs =>
  new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const WrapLogin = withInput(Login);
const WrapRegister = withInput(Register);

const AuthContainer = React.memo(props => {
  const [shown, setShown] = useState("login");
  const [activeStep, setActiveStep] = useState(2);
  const [anims, setAnims] = useState({
    register: "",
    login: ""
  });

  const displayOtherForm = React.useCallback(
    (destination, origin) => {
      if (shown === destination) {
        return false;
      }
      setAnims({
        [origin]: `slide-out-${origin}`
      });
      sleep(230).then(() => {
        setAnims({
          [origin]: "",
          [destination]: `slide-in-${destination}`
        });
        setShown(destination);
      });
    },
    [shown]
  );
  const navigateAuth = e => {
    if (e === 0) {
      displayOtherForm("register", "login");
    } else {
      displayOtherForm("login", "register");
    }
    setActiveStep(e + 1);
  };
  const changeShown = e => {
    const navenum = {
      login: 1,
      register: 0
    };
    navigateAuth(navenum[e.target.dataset.location]);
  };

  return (
    <>
      <div className={`locateSibling ${anims[shown]}`}>
        {shown === "login" && (
          <WrapLogin changeShown={changeShown} openAlert={props.openAlert} />
        )}
        {shown === "register" && (
          <Suspense fallback={<Skeleton />}>
            <WrapRegister
              openAlert={props.openAlert}
              displayOtherForm={displayOtherForm}
              setActiveStep={setActiveStep}
              changeShown={changeShown}
            />
          </Suspense>
        )}
      </div>
      <Steps navigateAuth={navigateAuth} activeStep={activeStep} />
    </>
  );
});

export default AuthContainer;
