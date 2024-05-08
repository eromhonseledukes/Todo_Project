document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'complete' : ''}">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const newTask = {
            id: Date.now(), // Use a unique identifier
            text: text,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        input.value = "";
        loadTasks();
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}