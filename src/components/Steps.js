import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ["Zarejestruj się", "Zaloguj się"];
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
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
