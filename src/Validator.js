class Validator {
  static errMessages = {
    shortLogin: "Login krótszy niż trzy znaki",
    shortEmail: "Za krótki adres email",
    wrongFormat: "Nieprawidłowy format adresu email",
    shortPwd: "Hasło krótsze niż trzy znaki",
    difPwd: "Hasła nie są identyczne"
  };
  constructor(state) {
    this.errors = state.err;
    this.state = state;
  }
  _isTooShort(field, minLength) {
    if (field.length < 1) return false;
    return field.length < minLength;
  }
  _isEmailValid(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  }
  _addErrMsg(field, msg) {
    this.errors[field] = Validator.errMessages[msg];
  }
  login() {
    return this._fieldLength("login", 3, "shortLogin");
  }
  email() {
    const { email } = this.state;
    if (this._isTooShort(email, 4)) {
      this._addErrMsg("email", "shortEmail");
      return this.errors;
    }
    if (email.length > 3 && !this._isEmailValid(email)) {
      this._addErrMsg("email", "wrongFormat");
      return this.errors;
    }
    delete this.errors.email;
    return this.errors;
  }
  _fieldLength(fieldNaem, len, errMes) {
    const field = this.state[fieldNaem];
    if (!this._isTooShort(field, len)) {
      delete this.errors[fieldNaem];
      return this.errors;
    }
    this._addErrMsg(fieldNaem, errMes);
    return this.errors;
  }
  password() {
    return this._fieldLength("password", 3, "shortPwd");
  }
  _arePwdsEqual() {
    const { regPassword, confirmPassword } = this.state;
    if (regPassword !== confirmPassword) {
      this._addErrMsg("regPassword", "difPwd");
      this._addErrMsg("confirmPassword", "difPwd");
      return this.errors;
    }
    delete this.errors.regPassword;
    delete this.errors.confirmPassword;
    return this.errors;
  }

  regPassword() {
    const { confirmPassword } = this.state;
    if (!confirmPassword.length) {
      return this._fieldLength("regPassword", 3, "shortPwd");
    }
    return this._arePwdsEqual();
  }
  confirmPassword() {
    return this._arePwdsEqual();
  }
}

export default Validator;
