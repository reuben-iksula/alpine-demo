import Alpine from "alpinejs";
import "./index.css";

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");

    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
includeHTML();

window.Alpine = Alpine;

Alpine.data("router", () => ({
  isAuthenticated: false,
  page: location.hash,
  todoId: null,
  routes: ["", "#login", "#todolist", "#create-todo", "#403"],
  routesWithQueryParams: [/#todo\?id=[a-zA-Z0-9\-]+/],

  checkAuth() {
    const pageIsKnown = !this.isPageUnknownStatus404();
    console.log(this.isAuthenticated);
    if (!this.isAuthenticated && pageIsKnown && this.page !== "#login") {
      location.hash = "#403";
    }
  },
  setTodoId() {
    const [hash, query] = this.page.split("?");
    const todoId = new URLSearchParams(query).get("id");
    this.todoId = todoId;
  },

  isPageUnknownStatus404() {
    let didNotFindNormalRoute = !this.routes.includes(this.page);
    let didNotFindRouteWithQueryParams = !this.routesWithQueryParams.some(
      (regex) => regex.test(this.page)
    );
    return didNotFindNormalRoute && didNotFindRouteWithQueryParams;
  },
}));

Alpine.data("test", () => ({
  ingredients: null,

  async getApi() {
    const response = await fetch(
      "https://react-hooks-8330e-default-rtdb.firebaseio.com/ingredients.json"
    );
    const data = await response.json();
    return data;
  },

  formatData(data) {
    let formattedData = [];
    for (let item in data) {
      formattedData.push({ id: item, ...data[item] });
    }
    return formattedData;
  },
}));

Alpine.data("todoitem", () => ({
  todo: null,
  async findTodoWithIdAndSet() {
    // this.ingredients.find((item) => item.id === todoId);
    const response = await fetch(
      `https://react-hooks-8330e-default-rtdb.firebaseio.com/ingredients.json?orderBy="$key"&equalTo="${this.todoId}"`
    );
    const data = await response.json();
    // return ;
    return { id: this.todoId, ...data[this.todoId] };
  },
}));

Alpine.data("loginValidation", () => ({
  username: "",
  userpass: "",
  error: false,
  errormessage: "",
  validemail: true,
  validpass: true,
  formValidate: true,

  checkValidate(value) {
    const { username, userpass } = value;

    if (!username.includes("@")) {
      this.error = true;
      this.errormessage = "username should be an email address";
      this.validemail = false;
      return;
    }
    if (username) {
      console.log("VALID");
    }
    console.log(userpass.length);
    if (userpass.length < 6) {
      this.error = true;
      this.errormessage = "password length must be > 6";
      this.validpass = false;
      console.log("PASSWORD VALIDATION");
      return;
    }
    if (username.includes("@")) {
      this.errorCleanUp();
    }
    if (userpass.length > 6) {
      console.log("VALID PASS");
      this.errorCleanUp();
    }
  },
  errorCleanUp() {
    this.error = false;
    this.errormessage = "";
    this.validemail = true;
    this.validpass = true;
  },
  submitHandler(value) {
    this.checkValidate(value);
    if (this.validemail && this.validpass) {
      this.errorCleanUp();
      // router closure property
      this.isAuthenticated = true;
      location.hash = "#todolist";
    }
  },
}));

Alpine.start();
