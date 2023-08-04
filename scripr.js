const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

let oldInputValue;

//função://

const saveTodo = (text) =>{

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = ' <i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deletBtn = document.createElement("button")
    deletBtn.classList.add("remove-todo")
    deletBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        
        }
    });
   
};

//Evento://
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const inputValue = todoInput.value; 
    
    if( inputValue){
       saveTodo(inputValue)
    }
});

//Evento 2: para dizer se a tarefa foi feita ou não//

document.addEventListener('click', (e) => {

    const targetEl = e.target;
    const parenEl = targetEl.closest("div");
    let todoTitle;
    
    if(parenEl && parenEl.querySelector("h3")){
        todoTitle = parenEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){

        parenEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        parenEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

//Evento do botão cancelar//

cancelEditBtn.addEventListener("click", (e) =>{

    e.preventDefault()
    toggleForms();

});

//Evento de armazenar a tarefa//

editForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})