let tasks=[];
//diplay task function
function displayTask(taskList){ //added tasklist param so we can display what we want not always the whole array
let listContent="";
for(let i=0;i<taskList.length;i++){ //changed from task length to task list

    //listContent+="<li>"+taskList[i]+`<button onClick="deleteTask(${i})">X</button></li>`; //each task in list form    
let task=taskList[i]; //to get current task obj
let date=new Date(task.createdAt).toLocaleDateString(); //readable format

listContent +="<li>"+ task.title  
+"<small>Priority: "+ task.priority +"</small>"
+"<small>Created:" +date +"</small>"
+`<button onclick="editTask(${i})">Edit</button>`
+ `<button onclick="editpriority(${i})">Edit Priority</button>`
+`<button onClick="deleteTask(${i})">X</button></li>`
+`<button onclick="toggleTask(${i})">${
    task.completed ? "Mark Pending" : "Mark Complete"
}</button>`


}
document.getElementById("list").innerHTML=listContent;
}

let taskInput=document.getElementById("task");
let priorityInput = document.getElementById("priority");

//on enter : submission of task
    taskInput.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        //event.preventDefault(); //cancels the default action if needed
    document.getElementById("button1").click();
    }
    });
    
//add task function
function addTask(){
  
    let text=taskInput.value.trim(); //to remove spaces from beginning and end
    
    if(text===""){ // if input is empty
        return;
    }

    let task={
        title: text,
        createdAt: new Date().toISOString(),
        priority:priorityInput.value,
        completed: false
    };
    tasks.push(task);
    taskInput.value="";
    //because first add then save then display all together on ui
    saveTask();
    displayTask(tasks);
}

//save task function
function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks)); //setItem:saves data(localStrogae stor data in strings)
}

//edit task
function editTask(i){
let newTitle=prompt("edit the task",tasks[i].title);
if(newTitle===null){
    return;
}
newTitle=newTitle.trim();

if(newTitle===""){
    alert("task can't be empty");
    return;
}
tasks[i].title=newTitle;
saveTask();
displayTask(tasks);
}

//edit prority function
function editpriority(i){
    let newPriority=prompt("enter priority",tasks[i].priority);

    if(newPriority===null){
        return;
    }

    newPriority=newPriority.trim().toLowerCase();

    if(!["high","medium","low"].includes(newPriority)){
        alert("Please enter High,Medium, or Low");
        return;
    }

    tasks[i].priority=newPriority.charAt(0).toUpperCase() +newPriority.slice(1); //convert char to uppercase "H" + "igh" so splice
    saveTask();
    displayTask(tasks);
}



//delete fucntion
function deleteTask(i){  //to tell which function to delete so i as param
let confirmDelete= confirm("sure! to delete task");

if(confirmDelete){
    tasks.splice(i,1);//at ith index remove 1 element
    saveTask();
    displayTask(tasks);
}
}

function deleteAll(){
    tasks=[];
    saveTask();
    displayTask(tasks);
}

//load task function: when close browser and wants the previous data
function loadTask(){
let saved=localStorage.getItem("tasks");//if anything stored in task in local storage save to saved
if(saved!==null){
    tasks=JSON.parse(saved);
}
}
loadTask();
displayTask(tasks);
//function to delete all

//filter task function
function filterTask(status){
if(status==="all"){
    displayTask(tasks);
}

else if(status==="pending"){
    let pendingTasks=tasks.filter(task=>task.completed===false);
    displayTask(pendingTasks);
}
else if(status==="completed"){
    let completedTasks=tasks.filter(task=>task.completed===true);
    displayTask(completedTasks);
}
}





