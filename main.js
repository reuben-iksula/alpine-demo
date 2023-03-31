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

Alpine.data("createNewTodo", () => ({
  title: "",
  description: "",
  date: null,
  titleError: false,
  descriptionError: false,
  titleErrorMessage: "",
  descriptionErrorMessage: "",

  validateTitle() {
    if (this.title === "") {
      this.titleError = true;
      this.titleErrorMessage = "Title cannot be empty";
    } else {
      this.titleErrorCleanUp();
    }
  },
  validateDescription() {
    if (this.description === "") {
      this.descriptionError = true;
      this.descriptionErrorMessage = "Description cannot be empty";
    } else {
      this.descriptionErrorCleanUp();
    }
  },
  checkValidate() {
    this.validateTitle();
    this.validateDescription();
  },

  titleErrorCleanUp() {
    this.titleError = false;
    this.titleErrorMessage = "";
  },
  descriptionErrorCleanUp() {
    this.descriptionError = false;
    this.descriptionErrorMessage = "";
  },

  clearInputs() {
    this.title = "";
    this.description = "";
  },

  async postDataToFirebase(data) {
    try {
      await fetch(
        "https://todo-collab-e32d9-default-rtdb.firebaseio.com/todo.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  async submitHandler() {
    this.checkValidate();
    if (!this.titleError) {
      this.titleErrorCleanUp();
    }
    if (!this.descriptionError) {
      this.descriptionErrorCleanUp();
    }

    if (!this.titleError && !this.descriptionError) {
      this.date = new Date();
      console.log(this.title, this.description, this.date);
      await this.postDataToFirebase({
        title: this.title,
        description: this.description,
        createdAt: this.date,
      });
      this.clearInputs();
    }
  },
}));

Alpine.start();
