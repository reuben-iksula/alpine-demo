import Alpine from "alpinejs";
import "../index.css";

window.Alpine = Alpine;

Alpine.data("todo", () => ({
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
}));

Alpine.start();
