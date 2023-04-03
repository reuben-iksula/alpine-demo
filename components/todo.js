export default () => ({
  todoFormVisible: false,
  individualTodoVisible: false,
  editIndividualTodo: false,
  deleteTodo: false,
  todoListVisible: true,
  todoData: {},
  individualTodoData: {},
  isLoading: null,
  async init() {
    try {
      this.isLoading = true;
      const data = await (
        await fetch(
          "https://todo-collab-e32d9-default-rtdb.firebaseio.com/todo.json"
        )
      ).json();
      this.todoData = this.addIdInData(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  },

  clickedStickyWall() {
    this.todoListVisible = true;
    this.todoFormVisible = false;
    this.individualTodoVisible = false;
    this.editIndividualTodo = false;
    this.deleteTodo = false;
    location.hash = "";
    this.init();
  },
  clickedCreateTodo() {
    this.todoListVisible = false;
    this.todoFormVisible = true;
    this.individualTodoVisible = false;
    this.editIndividualTodo = false;
    this.deleteTodo = false;
    location.hash = "";
  },
  clickedEditTodo() {
    this.todoListVisible = false;
    this.todoFormVisible = false;
    this.editIndividualTodo = true;
    this.individualTodoVisible = false;
    this.todoListVisible = false;
    this.deleteTodo = false;
  },

  clickedDeleteTodo() {
    this.individualTodoVisible = true;
    this.todoListVisible = false;
    this.deleteTodo = true;
  },

  todoClickHandler(todoId) {
    location.hash = `?id=${todoId}`;
    this.individualTodoVisible = true;
    this.deleteTodo = false;
    this.editIndividualTodo = false;
    this.todoFormVisible = false;
    this.todoListVisible = false;
  },

  addIdInData(data) {
    let dataWithId = [];
    for (let index in data) {
      dataWithId.push({ id: index, ...data[index] });
    }
    return dataWithId;
  },

  async loadTodo() {
    const todoParams = Object.fromEntries(new URLSearchParams(location.hash));
    todoParams["id"] = todoParams["#?id"];

    try {
      if (todoParams.id) {
        this.isLoading = true;
        const todoData = await fetch(
          `https://todo-collab-e32d9-default-rtdb.firebaseio.com/todo.json?orderBy="$key"&equalTo="${todoParams.id}"`
        );
        this.individualTodoData = {
          id: todoParams.id,
          ...(await todoData.json())[todoParams.id],
        };
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  },
});
