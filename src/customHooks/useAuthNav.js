// shown
// setShown
import React from "react";
import { AuthContext } from "../contexts/AuthContext";

const sleep = waitTimeInMs =>
  new Promise(resolve => setTimeout(resolve, waitTimeInMs));

export default function useAuthhNav() {
  const { state, setState } = React.useContext(AuthContext);
  const displayOtherForm = options => {
    const [destination, origin, step] = options;
    if (state.shown === destination) {
      return false;
    }
    setState({
      ...state,
      anims: `slide-out-${origin}`
    });
    sleep(250).then(() => {
      setState({
        ...state,
        activeStep: step,
        anims: `slide-in-${destination}`,
        shown: destination
      });
    });
  };

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
  const { shown, anims, activeStep } = state;
  return [shown, anims, activeStep, navigateAuth];
}
