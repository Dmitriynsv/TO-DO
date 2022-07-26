const todos = [];
const addTodoButton = document.querySelector("[data-add-todo-button]");
const template = document.getElementById("template");
const events = document.getElementById('events');
const infoTodo = document.querySelector('[data-inter-todo]');
//1 получить элемент поля(где ввожу текст)  


addTodoButton.addEventListener("click", () => {

  const newTodo = {
    text: infoTodo.value,
      };
    infoTodo.value = '';
  todos.push(newTodo);
  render(todos);
});

function render(todos) {
  const todoElements = [];

  todos.forEach((todo) => {
    todoElements.push(createTodo(todo));
  });

events.replaceChildren(...todoElements);
}

function createTodo(todo) {
  const todoElement = document.importNode(template.content, true);
  const title = todoElement.getElementById("title");

  title.innerText = todo.text;

  return todoElement;
}
