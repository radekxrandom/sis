import { useState } from "react";
import Validator from "./Validator";

export function useFormFields(initialState) {
  const [state, setState] = useState(initialState);

  return [
    state,
    function(e) {
      const { name } = e.target;
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      let fakeState = { ...state };
      fakeState[name] = value;
      const validator = new Validator(fakeState);
      const validated = validator[name]();
      setState({
        ...state,
        [name]: value,
        err: validated
      });
    }
  ];
}
