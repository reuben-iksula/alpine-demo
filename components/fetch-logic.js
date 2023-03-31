import Alpine from "alpinejs";
import "../index.css";

window.Alpine = Alpine;

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
      this.titleError = false;
      this.titleErrorMessage = "";
    }
  },

  validateDescription() {
    if (this.description === "") {
      this.descriptionError = true;
      this.descriptionErrorMessage = "Description cannot be empty";
    } else {
      this.descriptionError = false;
      this.descriptionErrorMessage = "";
    }
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
    } catch (error) {
      console.log(error);
    }
  },

  async submitHandler() {
    this.validateTitle();
    this.validateDescription();

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
