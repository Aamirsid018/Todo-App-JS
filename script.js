const inputBox = document.querySelector("#inputBox")
const addBTn = document.querySelector("#addBtn")
const todoList = document.querySelector("#todoList")

let editTodo = null;

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("Must write somthing..")
        return false;
    }

    if (addBTn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBTn.value = "Add";
        inputBox.value = ""
    }
    else {
        // creating p and li
        const p = document.createElement("p")
        const li = document.createElement("li")
        p.innerHTML = inputText;
        li.appendChild(p);

        // creating Edit btn
        const editBTn = document.createElement("button")
        editBTn.innerText = "Edit"
        editBTn.classList.add("btn", "editBtn")
        li.appendChild(editBTn)

        // creating Delete btn
        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Delete"
        deleteBtn.classList.add("btn", "deleteBtn")
        li.appendChild(deleteBtn)

        const list = document.querySelector(".todoList")
        list.appendChild(li);
        inputBox.value = "";
        saveLocalTodo(inputText);
    }
}

const updateTodo = (e) => {
    if (e.target.innerHTML === "Delete") {
        todoList.removeChild(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBTn.value = "Edit"
        editTodo = e;
    }

}

let saveLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todo = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

addBTn.addEventListener("click", addTodo)
todoList.addEventListener("click", updateTodo)

