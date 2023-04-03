import Alpine from "alpinejs";
import "../index.css";

window.Alpine = Alpine;

Alpine.data("loginValidation", () => ({
  username: "",
  password: "",
  usernameError: false,
  passwordError: false,
  passwordErrorMessage: "",
  usernameErrorMessage: "",

  usernameValidate() {
    this.usernameError = !this.username.includes("@");
  },
  passwordValidate() {
    this.passwordError = this.password.length < 8;
  },

  submitHandler() {
    this.usernameValidate();
    this.passwordValidate();
    if (this.usernameError) {
      this.usernameErrorMessage = "Please enter a valid email";
    }
    if (this.passwordError) {
      this.passwordErrorMessage = "Password must be at least 8 characters!";
    }
  },
}));

Alpine.start();
