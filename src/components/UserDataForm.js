import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useUserData from "../useUserData";
import useSubmitHook from "../useSubmitHook";

const UserDataForm = props => {
  const [err, setErr] = React.useState({});
  const [userInfo, fetchData, loading, data, handleInput] = useUserData(
    err,
    setErr
  );
  const [animation, submit, displayErrAlert] = useSubmitHook(props.openAlert);
  const handleSubmit = async e => {
    e.preventDefault();
    const errors = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value.length ? null : "Popraw pole"
      ])
    );
    const isCorrect = Object.values(errors).some(el => el !== null);
    if (isCorrect) {
      setErr(errors);
      displayErrAlert("Problem");
      return false;
    }
    const { name, surname, birthDate, gender, description } = data;
    const form = {
      name,
      surname,
      birthDate,
      gender,
      description
    };
    const put = await submit("put", "api/v1/user/basicinfo?lang=pl", form);
    if (put) {
      props.openAlert("Pomyślnie zaktualizowano dane", "success");
      fetchData();
    }
  };

  return (
    <>
      {!loading ? (
        <div className="article">
          <div className="contform">
            <div className="contInfo">
              <h1>{`Witaj ${userInfo.name || ""} ${userInfo.surname ||
                ""}`}</h1>
            </div>
            <div className={`mess ${animation}`}>
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  className="formFieldLeft"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={data.name}
                  id="name"
                  label="Imie"
                  name="name"
                  error={!!err?.name}
                  helperText={err?.name || ""}
                  inputProps={{ "aria-label": "Imie" }}
                  onChange={handleInput}
                />
                <TextField
                  className="formFieldRight"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={data.surname}
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                  inputProps={{ "aria-label": "Nazwisko" }}
                  onChange={handleInput}
                  error={!!err?.surname}
                  helperText={err?.surname || ""}
                />
                <TextField
                  className="formFieldLeft"
                  id="birthDate"
                  label="Data urodzenia"
                  type="date"
                  name="birthDate"
                  value={data.birthDate}
                  inputProps={{ "aria-label": "Data urodzenia" }}
                  required
                  onChange={handleInput}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  error={!!err?.birthDate}
                  helperText={err?.birthDate || ""}
                />

                <FormControl
                  variant="outlined"
                  className="formFieldRight formcont"
                >
                  <InputLabel id="Płeć">Plec</InputLabel>
                  <Select
                    inputProps={{ "aria-label": "Płeć" }}
                    labelId="Płeć"
                    id="demo-simple-select-outlined"
                    onChange={handleInput}
                    label="Plec"
                    name="gender"
                    error={!!err?.gender}
                    helperText={err?.gender || ""}
                    value={data.gender}
                  >
                    <MenuItem ariaLabel="Mezczyzna" value={`FEMALE`}>
                      Kobieta
                    </MenuItem>
                    <MenuItem ariaLabel="Mezczyzna" value={`MALE`}>
                      Mezczyzna
                    </MenuItem>
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
                  value={data.description}
                  variant="outlined"
                  onChange={handleInput}
                  error={!!err?.description}
                  helperText={err?.description || ""}
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
      ) : (
        <div className="loaderWrap">
          <div className="loader">Loading...</div>
        </div>
      )}
    </>
  );
};

export default UserDataForm;
