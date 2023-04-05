export default () => ({
  editTitle: "",
  editDescription: "",

  editTitleError: null,
  editDescriptionError: null,

  editTitleErrorMessage: "",
  editDescriptionErrorMessage: "",

  initialTitle: "",

  isLoading: null,

  editTitleValidate(initialTitle) {
    if (this.editTitle === "") {
      this.editTitleError = true;
      this.editTitleErrorMessage = "Title cannot be empty.";
    } else {
      this.editTitleError = null;
      this.editTitleErrorMessage = "";
    }
  },

  editDescriptionValidate(initialDescription) {
    if (this.editDescription === initialDescription) {
      this.editDescriptionError = true;
      this.editDescriptionErrorMessage =
        "Description cannot be the same as before.";
    } else if (this.editDescription === "") {
      this.editDescriptionError = true;
      this.editDescriptionErrorMessage = "Description cannot be empty.";
    } else {
      this.editDescriptionError = null;
      this.editDescriptionErrorMessage = "";
    }
  },

  clearInputs() {
    this.editTitle = "";
    this.editDescription = "";
  },

  async updateDataInFirebase(data) {
    const todoParams = Object.fromEntries(new URLSearchParams(location.hash));
    todoParams["id"] = todoParams["#todo?id"];
    try {
      if (todoParams.id) {
        await fetch(
          `https://todo-collab-e32d9-default-rtdb.firebaseio.com/todo/${todoParams.id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  },

  async submitHandler(individualToData) {
    this.editTitleValidate(individualToData.title);
    this.editDescriptionValidate(individualToData.description);
    if (!this.editTitleError && !this.editDescriptionError) {
      await this.updateDataInFirebase({
        createdAt: new Date(),
        title: this.editTitle,
        description: this.editDescription,
      });
      this.$dispatch("todo-updated");
      location.href = "main.html#sticky-wall";
    }
  },
});
