export default () => ({
  todoFormVisible: false,
  todoData: {},
  isLoading: null,
  async init() {
    try {
      this.isLoading = true;
      this.todoData = await (
        await fetch(
          "https://todo-collab-e32d9-default-rtdb.firebaseio.com/todo.json"
        )
      ).json();
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  },
});
