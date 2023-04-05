export default () => ({
  title: "",
  description: "",
  date: null,
  titleError: null,
  descriptionError: null,
  titleErrorMessage: "Title cannot be empty",
  descriptionErrorMessage: "Description cannot be empty",

  validateTitle() {
    this.titleError = this.title === "";
  },

  validateDescription() {
    this.descriptionError = this.description === "";
  },

  clearInputs() {
    this.title = "";
    this.description = "";
    this.titleError = null;
    this.descriptionError = null;
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
      await this.init();
      this.clearInputs();
    }
  },
});
