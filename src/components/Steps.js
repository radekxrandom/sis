import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import useAuthNav from "../useAuthNav";

function getSteps() {
  return ["Zarejestruj się", "Zaloguj się"];
}

export default function CustomizedSteppers(props) {
  const steps = getSteps();
  const [, , activeStep, navigateAuth] = useAuthNav();
  console.log(activeStep);
  return (
    <div className="steps">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step onClick={() => navigateAuth(index)} key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
