import React, { useState, Suspense } from "react";
//import Login from "../components/Login";
import Register from "../components/Register";
import Steps from "../components/Steps";
import Skeleton from "@material-ui/lab/Skeleton";
import useAuthNav from "../useAuthNav";
import { AuthContextProvider } from "./AuthContext";

const Login = React.lazy(() => import("../components/Login"));

const sleep = waitTimeInMs =>
  new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const AuthContainer = React.memo(props => {
  /*
  const [shown, setShown] = useState("register");
  const [activeStep, setActiveStep] = useState(1);
  const [anims, setAnims] = useState("");

  const displayOtherForm = React.useCallback(
    options => {
      const [destination, origin, step] = options;
      if (shown === destination) {
        return false;
      }
      setActiveStep(step);
      setAnims(`slide-out-${origin}`);
      sleep(250).then(() => {
        setAnims(`slide-in-${destination}`);
        setShown(destination);
      });
    },
    [shown]
  );
  const navigateAuth = index => {
    const options = [
      ["register", "login", 1],
      ["login", "register", 2]
    ];
    //its better practice to use dataset instead of inline
    //functions in jsx, but it wasn't posbie in every place
    //where this function is used
    const navIndex = index.target?.dataset.location || index;
    displayOtherForm(options[navIndex]);
  };
*/

  const [shown, anims, , navigateAuth] = useAuthNav();
  //const [state, setState] = React.useContext(AuthContext);
  React.useEffect(() => {
    const keyboardNav = e => {
      if (
        e.target.tagName === "INPUT" ||
        (e.keyCode !== 37 && e.keyCode !== 39)
      ) {
        return;
      }
      if (e.keyCode === 37) {
        navigateAuth(0);
        return;
      }
      if (e.keyCode === 39) {
        navigateAuth(1);
        return;
      }
    };
    window.addEventListener("keydown", keyboardNav);

    return () => {
      window.removeEventListener("keydown", keyboardNav);
    };
  }, [navigateAuth]);

  return (
    <>
      <div className={anims}>
        {shown === "login" && (
          <Suspense fallback={<Skeleton />}>
            <Login openAlert={props.openAlert} />
          </Suspense>
        )}
        {shown === "register" && <Register openAlert={props.openAlert} />}
      </div>
      <Steps />
    </>
  );
});

export default AuthContainer;
