let tasks=[];
//diplay task function
function displayTask(){
let listContent="";
for(let i=0;i<tasks.length;i++){
listContent+="<li>"+tasks[i]+`<button onClick="deleteTask(${i})">X</button></li>`; //each task in list form    
}
document.getElementById("list").innerHTML=listContent;
}

let taskInput=document.getElementById("task");
//on enter submission of task
    taskInput.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        //event.preventDefault(); //cancels the default action if needed
    document.getElementById("button1").click();
    }
    });
    
//add task function
function addTask(){
  
    let text=taskInput.value;
    
    if(text===""){
        return;
    }
    tasks.push(text);
    taskInput.value="";
    //because first add then save then display all together on ui
    saveTask();
    displayTask();
}

//save task function
function saveTask(){
    localStorage.setItem("tasks",JSON.stringify(tasks)); //setItem:saves data(localStrogae stor data in strings)
}



//delete fucntion
function deleteTask(i){  //to tell which function to delete so i as param
tasks.splice(i,1);//at ith index remove 1 element
saveTask();
displayTask();
}
function deleteAll(){
    tasks=[];
    saveTask();
    displayTask();
}

//load task function: when close browser and wants the previous data
function loadTask(){
let saved=localStorage.getItem("tasks");//if anything stored in task in local storage save to saved
if(saved!==null){
    tasks=JSON.parse(saved);
}
}
loadTask();
displayTask();
//function to delete all

//filter task function
function filterTasks(){

}
