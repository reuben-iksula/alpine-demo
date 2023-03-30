import Alpine from "alpinejs";
import "./index.css";

window.Alpine = Alpine;

Alpine.data("loginValidation", () => ({
  username: "",
  userpass: "",
  userError: false,
  passError: false,
  passErrorMessage: "",
  userErrorMessage: "",
  formValidate: true,

  checkValidate(value) {
    const { username, userpass } = value;

    if (!username.includes("@")) {
      this.userError = true;
      this.userErrorMessage = "Please enter a valid email";
    }
    if (username) {
      console.log("VALID");
    }
    console.log(userpass.length);
    if (userpass.length < 8) {
      this.passError = true;
      this.passErrorMessage = "Password must be at least 8 characters!";
      console.log("PASSWORD VALIDATION");
    }
    if (username.includes("@")) {
      this.userErrorCleanUp();
    }
    if (userpass.length > 7) {
      console.log("VALID PASS");
      this.passErrorCleanUp();
    }
  },
  userErrorCleanUp() {
    this.userError = false;
    this.userErrorMessage = "";
  },
  passErrorCleanUp() {
    this.passError = false;
    this.passErrorMessage = "";
  },
  submitHandler(value) {
    this.checkValidate(value);
    if (!this.userError) {
      this.userErrorCleanUp();
    }
    if (!this.passError) {
      this.passErrorCleanUp();
    }
  },
}));

Alpine.start();
