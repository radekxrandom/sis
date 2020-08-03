import React, { useState, Suspense } from "react";
//import Login from "../components/Login";
import Register from "../components/Register";
import Steps from "../components/Steps";
import Skeleton from "@material-ui/lab/Skeleton";

const Login = React.lazy(() => import("../components/Login"));

const sleep = waitTimeInMs =>
  new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const AuthContainer = React.memo(props => {
  const [shown, setShown] = useState("register");
  const [activeStep, setActiveStep] = useState(1);
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
      <div className={anims[shown]}>
        {shown === "login" && (
          <Suspense fallback={<Skeleton />}>
            <Login changeShown={changeShown} openAlert={props.openAlert} />
          </Suspense>
        )}
        {shown === "register" && (
          <Register
            openAlert={props.openAlert}
            displayOtherForm={displayOtherForm}
            setActiveStep={setActiveStep}
            changeShown={changeShown}
          />
        )}
      </div>
      <Steps navigateAuth={navigateAuth} activeStep={activeStep} />
    </>
  );
});

export default AuthContainer;
