let todos = [];
const addTodoButton = document.querySelector('[data-add-todo-button]');
const template = document.querySelector('[data-template]');
const events = document.getElementById('events');
const infoTodo = document.querySelector('[data-inter-todo]');
const active = document.querySelector('[data-active]');
const completed = document.querySelector('[data-completed]');


addTodoButton.addEventListener('click',() =>{
  const text = infoTodo.value.trim();

  if (text) {
    const newTodo = {
      id: todos.length +1,
      text,
      completed: false,
    }
    todos.push(newTodo);
    infoTodo.Value  = '';
  }
  infoTodo.focus();

  updateActiveCounter();
  render ();
});

function createTodo(id,text){
  const todoItem = document.importNode(template.content, true);
  const todoText = todoItem.getElementById('title');
  todoText.textContent = text;
  infoTodo.value = ''; 
  const btnRemove = todoItem.querySelector('[data-dtn-remove]');
  const checkbox = todoItem.querySelector('[data-template-input]');


  btnRemove.addEventListener('click', ()=>{
    todos = todos.filter(todo => todo.id !== id);

   updateActiveCounter(); 
   updateCompletedCounter();   

    render();
  })
  
  checkbox.addEventListener('click', ()=>{
    const todo = todos.find((el) => el.id === id);
    todo.completed = !todo.completed; 
    updateCompletedCounter();
    updateActiveCounter();
  })

  return todoItem;
}

function clearTodoList(){
  events.innerHTML = '';  
}

function appendTodos() {
  if (todos.length) {
    todos.forEach(el => {
      const todo = createTodo(el.id, el.text);
      events.append (todo);
    })
  } else {
    events.insertAdjacentHTML('beforeend',
    `<p>No todos...</p>`)
  }
}

function render(){
  clearTodoList();
  appendTodos();
}

render();

function updateActiveCounter(){
  active.innerHTML = todos.filter((el) => el.completed === false).length;
}

function updateCompletedCounter(){
  completed.innerHTML = todos.filter((el) => el.completed === true).length;
}

