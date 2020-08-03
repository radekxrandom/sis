import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Form = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    const { name, surname, birthDate, gender, description } = props.state;
    const form = {
      name,
      surname,
      birthDate,
      gender,
      description
    };
    try {
      const pach = await props.submit(
        "put",
        "api/v1/user/basicinfo?lang=pl",
        form
      );
      console.log(pach);
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
                onChange={props.handleInputWithoutValidation}
                autoComplete="name"
                autoFocus
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
                onChange={props.handleInputWithoutValidation}
                autoComplete="surname"
                autoFocus
              />
              <TextField
                className="formFieldLeft"
                id="birthDate"
                label="Wiek"
                type="date"
                name="birthDate"
                onChange={props.handleInputWithoutValidation}
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
                <InputLabel id="demo-simple-select-outlined-label">
                  Plec
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={props.state.gender}
                  onChange={props.handleInputWithoutValidation}
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
                variant="outlined"
                onChange={props.handleInputWithoutValidation}
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
