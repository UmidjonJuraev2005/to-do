const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
const clearBtn = document.querySelector(".clear-btn");
const filters = document.querySelectorAll(".filters span");

let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

function showTodo(filter = "all") {
    let li = "";
    todos.forEach((todo, id) => {
        // Show tasks based on the selected filter
        if (filter === "all" || filter === todo.status) {
            let isCompleted = todo.status === "completed" ? "checked" : "";
            li += `<li class="task">
                <label for="${id}">
                    <input type="checkbox" id="${id}" ${isCompleted} onclick="updateStatus(${id})">
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id})"><i class="uil uil-edit"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
        }
    });
    taskBox.innerHTML = li || `<p class="empty">No tasks to show here.</p>`;
}
showTodo();

function updateStatus(taskId) {
    todos[taskId].status = todos[taskId].status === "pending" ? "completed" : "pending";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

function editTask(taskId) {
    let newTask = prompt("Edit your task:", todos[taskId].name);
    if (newTask && newTask.trim() !== "") {
        todos[taskId].name = newTask.trim();
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
}

function deleteTask(taskId) {
    todos.splice(taskId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
}

clearBtn.addEventListener("click", () => {
    todos = [];
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
});

taskInput.addEventListener("keyup", (e) => {
    let userTask = taskInput.value.trim();
    if (e.key === "Enter" && userTask) {
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo);
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});

filters.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector(".filters .active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function editTask(taskId) {
    const taskItem = taskBox.querySelectorAll(".task")[taskId];
    const taskNameElement = taskItem.querySelector("p");
    const currentTaskName = todos[taskId].name;

    // Yangi input yaratamiz
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentTaskName;
    inputField.className = "edit-input";
    taskNameElement.replaceWith(inputField);
    inputField.focus();

    // Enter bosilganda yangi qiymatni saqlash
    inputField.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            const newTaskName = inputField.value.trim();
            if (newTaskName) {
                todos[taskId].name = newTaskName;
                localStorage.setItem("todo-list", JSON.stringify(todos));
                showTodo();
            } else {
                alert("Task name cannot be empty!");
                inputField.focus();
            }
        }
    });

    // Fokusdan chiqsa, o‘zgarishlarni saqlamasdan tiklash
    inputField.addEventListener("blur", () => {
        showTodo();
    });
}
