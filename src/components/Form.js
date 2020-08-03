import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { mainAxios } from "../axios/config";

const Form = props => {
  const [state, setState] = React.useState({
    name: "",
    surname: "",
    birthDate: "",
    gender: "",
    description: "",
    err: {}
  });
  const handleInput = e => {
    const { name } = e.target;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({
      ...state,
      [name]: value
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const { name, surname, birthDate, gender, description } = state;
    const form = {
      name,
      surname,
      birthDate,
      gender,
      description
    };
    try {
      const post = await mainAxios.put("api/v1/user/basicinfo?lang=pl", form);
      console.log(post);
      props.openAlert("Pomyślnie zaktualizowano dane", "success");
    } catch (err) {
      props.openAlert("Problem", "info");
    }
  };

  return (
    <>
      <div className="article">
        <div className="contform">
          <div className="contInfo">
            <h1>{`Witaj ${props.userData.name || ""} ${props.userData.surname ||
              ""}`}</h1>
          </div>
          <div className="mess">
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                className="formFieldLeft"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Imie"
                name="name"
                inputProps={{ "aria-label": "Imie" }}
                onChange={handleInput}
              />
              <TextField
                className="formFieldRight"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Nazwisko"
                name="surname"
                inputProps={{ "aria-label": "Nazwisko" }}
                onChange={handleInput}
              />
              <TextField
                className="formFieldLeft"
                id="birthDate"
                label="Data urodzenia"
                type="date"
                name="birthDate"
                inputProps={{ "aria-label": "Data urodzenia" }}
                required
                onChange={handleInput}
                variant="outlined"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <FormControl
                variant="outlined"
                className="formFieldRight formcont"
              >
                <InputLabel id="Płeć">Plec</InputLabel>
                <Select
                  labelId="Płeć"
                  id="demo-simple-select-outlined"
                  onChange={handleInput}
                  label="Plec"
                  name="gender"
                >
                  <MenuItem value={"FEMALE"}>Kobieta</MenuItem>
                  <MenuItem value={"MALE"}>Mezczyzna</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-multiline-static"
                label="Opis"
                name="description"
                multiline
                rows="7"
                fullWidth
                required
                variant="outlined"
                onChange={handleInput}
              />

              <Button
                type="submit"
                className="fullWidth marginTop"
                variant="outlined"
                color="primary"
              >
                Wyslij
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
