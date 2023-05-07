const todoForm = document.querySelector("form");
const todoInput = document.querySelector("form input");
const todoItemsList = document.querySelector("#tasks");

let toDos = [];
const todosLSkey = 'todo';


todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  addTodo(todoInput.value);
})

const addTodo = (todoText) => {
  if (!todoText.length) return;

  const todoData = {
    id: Date.now(),
    name: todoText,
  }

  toDos.push(todoData);
  addToLocalStorage(toDos);
  renderTodos(toDos);
  todoInput.value = "";

}

const deleteTodo = (id) => {

  toDos = toDos.filter(todo => {
    return todo.id != id
  });

  addToLocalStorage(toDos);
  renderTodos(toDos);
}

const addToLocalStorage = (toDos) => {
  localStorage.setItem(todosLSkey, JSON.stringify(toDos));
}

const getFromLocalStorage = () => {
  const data = localStorage.getItem(todosLSkey);
  if (!data) return;

  toDos = JSON.parse(data);
  renderTodos(toDos);
}

const renderTodos = (toDos) => {
  todoItemsList.innerHTML = '';

  toDos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add('task');
    li.setAttribute('data-key', todo.id);
    li.innerHTML = `
    <span id="taskname">
         ${todo.name}
    </span>
    <button class="delete">
        <i class="far fa-trash-alt"></i>
   </button>
    `
    todoItemsList.append(li);
  });
}

getFromLocalStorage();

todoItemsList.addEventListener('click', (event) => {

  if (event.target.classList.contains('delete')) {
    console.log(event.target.parentElement);
    deleteTodo(event.target.parentElement.getAttribute('data-key'))
  }
})