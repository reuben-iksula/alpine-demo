import Alpine from "alpinejs";
import "./index.css";

window.Alpine = Alpine;

Alpine.data("router", () => ({
  page: location.hash,
  todoId: null,
  routes: ["", "#login", "#todolist", "#create-todo"],
  routesWithQueryParams: [/#todo\?id=[a-zA-Z0-9]+/],

  setTodoId() {
    const [hash, query] = this.page.split("?");
    const todoId = new URLSearchParams(query).get("id");
    this.todoId = todoId;
  },

  checkRoutesFor404() {
    let foundANormalRoute = this.routes.includes(this.page);
    let foundARouteWithQueryParams = this.routesWithQueryParams.some((regex) =>
      regex.test(this.page)
    );
    return !(foundANormalRoute || foundARouteWithQueryParams);
  },
}));

Alpine.start();
