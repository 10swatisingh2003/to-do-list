const addButton = document.getElementById('addTask');
const taskinput = document.getElementById('taskinput');
const tasklist = document.getElementById('tasklist');

loadTasks();

function addTask() {
    const task = taskinput.value.trim();
    if (task) {
        createTaskElement(task);
        taskinput.value = '';
        saveTasks();
    } else {
        alert("Please enter the task");
    }
}

addButton.addEventListener('click', addTask);

function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

    // Create Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '';
    deleteButton.className = 'deleteTask';

    // Create Edit Button
    const editButton = document.createElement('button');
    editButton.textContent = '';
    editButton.className = 'editTask';

    // Append buttons to list item
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    tasklist.appendChild(listItem);

    // Delete Button Event
    deleteButton.addEventListener('click', function () {
        tasklist.removeChild(listItem);
        saveTasks();
    });

    // Edit Button Event
    editButton.addEventListener('click', function () {
        const newTask = prompt("Edit your task:", task);
        if (newTask && newTask.trim() !== "") {
            listItem.textContent = newTask.trim();
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            saveTasks();
        }
    });
}

function saveTasks() {
    let tasks = [];
    tasklist.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.textContent.replace('EditDelete', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}
