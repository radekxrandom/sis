// shown
// setShown
import React from "react";
import { AuthContext } from "./containers/AuthContext";

const sleep = waitTimeInMs =>
  new Promise(resolve => setTimeout(resolve, waitTimeInMs));

export default function useAuthhNav() {
  //const [shown, setShown] = React.useState("register");
  //const [anims, setAnims] = React.useState("");
  //const [activeStep, setActiveStep] = React.useState(1);
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
    //setActiveStep(step);
    //setAnims(`slide-out-${origin}`);
    sleep(250).then(() => {
      setState({
        ...state,
        activeStep: step,
        anims: `slide-in-${destination}`,
        shown: destination
      });
      //setAnims(`slide-in-${destination}`);
      //setShown(destination);
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
  return [state.shown, state.anims, state.activeStep, navigateAuth];
}
