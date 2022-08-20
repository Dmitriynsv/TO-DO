const key = "database";
let todos = [];
const addTodoButton = document.querySelector("[data-add-todo-button]");
const template = document.querySelector("[data-template]");
const events = document.getElementById("events");
const infoTodo = document.querySelector("[data-inter-todo]");
const active = document.querySelector("[data-active]");
const completed = document.querySelector("[data-completed]");

window.addEventListener("load", function (event) {
  const data = this.localStorage.getItem(key);
  todos = JSON.parse(data) ?? [];
  render(todos);
  updateActiveCounter();
  updateCompletedCounter();
});

addTodoButton.addEventListener("click", () => {
  const text = infoTodo.value.trim();

  if (text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      date: getStringDate(),
    };
    todos.push(newTodo);
    infoTodo.Value = "";
  }
  infoTodo.focus();

  updateActiveCounter();
  render(todos);
  localStorage.setItem(key, JSON.stringify(todos));
});

function createTodo(id, text, date, completed) {
  const todoItem = document.importNode(template.content, true);
  const todoText = todoItem.getElementById("title");
  todoText.textContent = text + " " + date;
  infoTodo.value = "";
  const btnRemove = todoItem.querySelector("[data-dtn-remove]");
  const checkbox = todoItem.querySelector("[data-template-input]");
  checkbox.checked = completed;

  btnRemove.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.id !== id);

    updateActiveCounter();
    updateCompletedCounter();

    render(todos);
    localStorage.setItem(key, JSON.stringify(todos));
  });

  checkbox.addEventListener("click", () => {
    const todo = todos.find((el) => el.id === id);
    todo.completed = !todo.completed;
    updateCompletedCounter();
    updateActiveCounter();
    localStorage.setItem(key, JSON.stringify(todos));
  });

  return todoItem;
}

function clearTodoList() {
  events.innerHTML = "";
}

function appendTodos(elements) {
  if (elements.length) {
    elements.forEach((el) => {
      const todo = createTodo(el.id, el.text, el.date, el.completed);
      events.append(todo);
    });
  } else {
    events.insertAdjacentHTML("beforeend", `<p>No todos...</p>`);
  }
}

function render(elements) {
  clearTodoList();
  appendTodos(elements);
}

render(todos);

function updateActiveCounter() {
  active.innerHTML = todos.filter((el) => el.completed === false).length;
}

function updateCompletedCounter() {
  completed.innerHTML = todos.filter((el) => el.completed === true).length;
}

const search = document.querySelector("[data-inter-event]");

search.addEventListener("input", () => {
  const searchValue = search.value.trim();

  if (searchValue) {
    const filterTodoList = todos.filter((el) => el.text.includes(searchValue));
    render(filterTodoList);
  } else {
    render(todos);
  }
});

const getStringDate = (
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  day = new Date().getDate(),
  hours = new Date().getHours(),
  minutes = new Date().getMinutes()
) => {
  const date = new Date(year, month, day, hours, minutes);

  return `${date.getHours()}:${String(
    date.getMinutes()
  )} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

const btnDeleteAll = document.querySelector(".control__operation_delete");
btnDeleteAll.addEventListener("click", () => {
  todos = [];
  updateActiveCounter();
  render(todos);
  localStorage.setItem(key, JSON.stringify(todos));
});

const btnDeleteComplected = document.querySelector(
  ".control__operation_completed"
);
btnDeleteComplected.addEventListener("click", () => {
  todos = todos.filter((el) => el.completed === false);
  render(todos);
  localStorage.setItem(key, JSON.stringify(todos));
});
