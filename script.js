let tasks = [];
let currentFilter = "all";

//diplay task function
function displayTask(taskList) { //added tasklist param so we can display what we want not always the whole array
    let listContent = "";
    for (let i = 0; i < taskList.length; i++) { //changed from task length to task list

        //listContent+="<li>"+taskList[i]+`<button onClick="deleteTask(${i})">X</button></li>`; //each task in list form    
        let task = taskList[i]; //to get current task obj
        let taskIndex = tasks.indexOf(task); // use original tasks indes when displaying
        let date = new Date(task.createdAt).toLocaleDateString(); //readable format

        listContent += "<li>" + (task.completed ? "<s>" + task.title + "</s>" : task.title) //<s> in html puts line on text
            + "<small>Priority: " + task.priority + "</small>"
            + "<small>Created:" + date + "</small>"
            + `<button onclick="editTask(${taskIndex})">Edit</button>`
            + `<button onclick="editpriority(${taskIndex})">Edit Priority</button>`
            + `<button onClick="deleteTask(${taskIndex})">X</button>`
            + `<button onclick="toggleTask(${taskIndex})">${task.completed ? "Mark Pending" : "Mark Complete"
            }</button></li>`;
    }
    if (taskList.length === 0) {
        let message = "";

        if (currentFilter === "all") {
            message = "No tasks yet";
        }
        else if (currentFilter === "pending") {
            message = "No pending task";
        }
        else if (currentFilter === "completed") {
            message = "You haven't completed anything";
        }

        document.getElementById("list").innerHTML =
            "<li>" + message + "</li>";
    } else {
        document.getElementById("list").innerHTML = listContent;
    }

    updateStats();
}

let taskInput = document.getElementById("task");
let priorityInput = document.getElementById("priority");

//on enter : submission of task
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        //event.preventDefault(); //cancels the default action if needed
        // document.getElementById("button1").click();
        addTask();
    }
});

//add task function
function addTask() {

    let text = taskInput.value.trim(); //to remove spaces from beginning and end

    if (text === "") { // if input is empty
        return;
    }

    let task = {
        title: text,
        createdAt: new Date().toISOString(),
        priority: priorityInput.value,
        completed: false
    };
    tasks.push(task);
    taskInput.value = "";
    //because first add then save then display all together on ui
    saveTask();
    displayTask(tasks);
    updateStats();
}

//save task function
function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //setItem:saves data(localStrogae stor data in strings)
}

//edit task
function editTask(i) {
    let newTitle = prompt("edit the task", tasks[i].title);
    if (newTitle === null) {
        return;
    }
    newTitle = newTitle.trim();

    if (newTitle === "") {
        alert("task can't be empty");
        return;
    }
    tasks[i].title = newTitle;
    saveTask();
    displayTask(tasks);
}

//edit prority function
function editpriority(i) {
    let newPriority = prompt("enter priority", tasks[i].priority);

    if (newPriority === null) {
        return;
    }

    newPriority = newPriority.trim().toLowerCase();

    if (!["high", "medium", "low"].includes(newPriority)) {
        alert("Please enter High,Medium, or Low");
        return;
    }

    tasks[i].priority = newPriority.charAt(0).toUpperCase() + newPriority.slice(1); //convert char to uppercase "H" + "igh" so splice
    saveTask();
    displayTask(tasks);
}

//delete fucntion
function deleteTask(i) {  //to tell which function to delete so i as param
    let confirmDelete = confirm("sure! to delete task");

    if (confirmDelete) {
        tasks.splice(i, 1);//at ith index remove 1 element
        saveTask();
        displayTask(tasks);
    }
}

function deleteAll() {
    let confirmDelete = confirm("Are you sure you want to delete ALL tasks?");
    if (confirmDelete) {
        tasks = [];
        saveTask();
        displayTask(tasks);
    }
}

//load task function: when close browser and wants the previous data
function loadTask() {
    let saved = localStorage.getItem("tasks");//if anything stored in task in local storage save to saved
    if (saved !== null) {
        tasks = JSON.parse(saved);
    }
}
loadTask();
displayTask(tasks);

//filter task function
function filterTask(status) {
    currentFilter = status;
    if (status === "all") {
        displayTask(tasks);
    }

    else if (status === "pending") {
        let pendingTasks = tasks.filter(task => task.completed === false);
        displayTask(pendingTasks);
    }
    else if (status === "completed") {
        let completedTasks = tasks.filter(task => task.completed === true);
        displayTask(completedTasks);
    }
}

//togglr function to mark complete or pending
function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    saveTask();
    displayTask(tasks);
}

//clear completed
function clearCompleted() {
    let confirmClear = confirm("Are you sure you want to delete all completed tasks?");

    if (confirmClear) {
        tasks = tasks.filter(task => task.completed === false);

        saveTask();
        displayTask(tasks);
    }
}

//statistics
function updateStats() {
    let total = tasks.length;
    let completed = tasks.filter(task => task.completed === true).length;
    let pending = tasks.filter(task => task.completed === false).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}





