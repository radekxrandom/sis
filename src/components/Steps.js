import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

function getSteps() {
  return ["Zarejestruj się", "Zaloguj się"];
}

export default function CustomizedSteppers(props) {
  const steps = getSteps();

  return (
    <div className="steps">
      <Stepper alternativeLabel activeStep={props.activeStep}>
        {steps.map((label, index) => (
          <Step onClick={() => props.navigateAuth(index)} key={label}>
            <StepButton>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
