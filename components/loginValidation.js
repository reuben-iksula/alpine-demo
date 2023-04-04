export default () => ({
  username: "",
  password: "",
  usernameError: null,
  passwordError: null,
  passwordErrorMessage: "",
  usernameErrorMessage: "",

  usernameValidate() {
    this.usernameError = !this.username.includes("@");
  },

  passwordValidate() {
    this.passwordError = this.password.length < 8;
  },

  clearInputs() {
    this.username = "";
    this.password = "";
  },

  submitHandler() {
    this.usernameValidate();
    this.passwordValidate();
    this.clearInputs();
    if (this.usernameError) {
      this.usernameErrorMessage = "Please enter a valid email";
    }
    if (this.passwordError) {
      this.passwordErrorMessage = "Password must be at least 8 characters!";
    }
    if (!this.usernameError && !this.passwordError) {
      location.href = "main.html#sticky-wall";
    }
  },
});
