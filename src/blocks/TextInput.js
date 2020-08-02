import React from "react";
import TextField from "@material-ui/core/TextField";

const TextInput = ({
  handleInput,
  name,
  label,
  clNaem,
  type,
  err,
  validate
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      className={clNaem}
      fullWidth
      id={name}
      label={label}
      name={name}
      onBlur={validate}
      onChange={handleInput}
      autoComplete={name}
      type={type}
      error={!!err}
      helperText={err || ""}
    />
  );
};

export default TextInput;
