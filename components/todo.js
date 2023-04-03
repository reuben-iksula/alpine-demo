export default () => ({
  todoFormVisible: false,
  todoData: {},
  async init() {
    try {
      this.todoData = await (
        await fetch(
          "https://todo-collab-e32d9-default-rtdb.firebaseio.com/todo.json"
        )
      ).json();
    } catch (error) {
      console.log(error);
    }
  },
});
