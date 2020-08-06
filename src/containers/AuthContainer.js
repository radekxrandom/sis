import React, { useState, Suspense } from "react";
//import Login from "../components/Login";
import Register from "../components/Register";
import Steps from "../components/Steps";
import Skeleton from "@material-ui/lab/Skeleton";
import useAuthNav from "../useAuthNav";

const Login = React.lazy(() => import("../components/Login"));

const AuthContainer = React.memo(props => {
  const [shown, anims, , navigateAuth] = useAuthNav();

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
