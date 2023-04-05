import Alpine from "alpinejs";
import "./index.css";
import loginValidation from "./components/loginValidation";
import createNewTodo from "./components/createNewTodo";
import todo from "./components/todo";
import editTodo from "./components/editTodo";

window.Alpine = Alpine;

Alpine.data("loginValidation", loginValidation);

Alpine.data("createNewTodo", createNewTodo);

Alpine.data("todo", todo);

Alpine.data("editTodo", editTodo);

Alpine.start();
