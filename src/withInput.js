import React, { useState } from "react";
import { mainAxios } from "./axios/config";
import Validator from "./Validator";

const withInput = Wrapped => {
  return React.memo(props => {
    const [state, setState] = useState({
      login: "",
      email: "",
      password: "",
      regPassword: "",
      confirmPassword: "",
      name: "",
      surname: "",
      birthDate: "",
      gender: "",
      description: "",
      err: {},
      saveLogin: ""
    });

    const handleInput = e => {
      const { name, value } = e.target;
      let fakeState = { ...state };
      fakeState[name] = value;
      const validator = new Validator(fakeState);
      const validated = validator[name]();
      setState({
        ...state,
        [name]: value,
        err: validated
      });
    };

    const handleInputWithoutValidation = e => {
      const { name } = e.target;
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setState({
        ...state,
        [name]: value
      });
    };

    const submit = (type, url, data) => {
      const post = mainAxios[type](url, data);
      console.log(post);
      return post;
    };

    const validate = e => {
      const elName = e.target.name;
      const validator = new Validator(state);
      const validated = validator[elName]();
      /* setState({
        ...state,
        err: validated
      });*/
    };

    return (
      <>
        <Wrapped
          handleInputWithoutValidation={handleInputWithoutValidation}
          validate={validate}
          state={state}
          setState={setState}
          handleInput={handleInput}
          submit={submit}
          {...props}
        />
      </>
    );
  });
};

export default withInput;
