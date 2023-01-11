//in order to have access to the task data, import LS here
import LS from './localstorage.js';


function UI() { }

//create a local storage object
const ls = new LS();

//to create the data in the local storage 
UI.prototype.showAllTasks = function(){
    // reading a method from ls
    let tasks = ls.fetch();
    let newHtml = '';
    tasks.forEach( (task) => {
        newHtml += `           
        <div class="todolist">
        <ul>
            <li class="list" data-creatdate="${task.id}" ${task.complete ? "completed" : ""}>
                <input type="checkbox" class="check" ${task.complete} ? 'checked' : ''>
                <span class="task">${task.title}</span>
                <i class="ri-delete-bin-5-line deleteIcon"></i>
                <i class="ri-edit-box-line editIcon"></i>
            </li>
        </ul>
        </div>`;        
    });
    document.querySelector('.todolist').innerHTML= newHtml;
};

//add the text to the list
UI.prototype.add = function (task) {

    ls.store(task);

    let newHTML = `           
            <div class="todolist">
            <ul>
                <li class="list" data-creatdate="${task.id}">
                    <input type="checkbox" class="check">
                    <span class="task">${task.title}</span>
                    <i class="ri-delete-bin-5-line deleteIcon"></i>
                    <i class="ri-edit-box-line editIcon"></i>
                </li>
            </ul>
            </div>`;

    document.querySelector(".todolist").insertAdjacentHTML('beforeend', newHTML);
};

//delete the text in text area
UI.prototype.resetArea = function () {
    document.querySelector(".text-input").value = "";
};

//delete the task from task list
UI.prototype.delete = function (e) {
    const deleteTask = e.target.parentElement;
    const id = deleteTask.dataset.createdate;

    ls.delete(id);
    deleteTask.remove();
};

//marking the task that is done
UI.prototype.mark = function (e) {
    const markTask = e.target.parentElement;
    const id = markTask.dataset.creatdate;
    ls.check(id);
    markTask.classList.toggle("complete");
};

//editing the task that was created before 
UI.prototype.edit = function (e) {
    const editTask = e.target.parentElement;
    const id = editTask.dataset.creatdate;
    const data = ls.findTask(id);

    document.querySelector(".text-input").value = data.title;
    document.querySelector("#updateTaskId").value = data.id;

    document.querySelector(".edit").style.display = "block";
    document.querySelector(".cancel").style.display = "block";
    document.querySelector(".insert-input").style.display = "none";
};

//updating the task that was edited
UI.prototype.updateTask = function (e){
    const taskId = document.querySelector('#updateTaskId').value;
    const taskTitle = document.querySelector('.text-input').value;
    const tasks = document.querySelectorAll('.task');

    if(taskTitle.length > 0){
        ls.updateTask(taskId,taskTitle);
        tasks.forEach((title) => {
            if(title.parentElement.dataset.creatdate === taskId){

                title.innerText = taskTitle; 
                console.log (taskTitle);
            }
        })
    }

    document.querySelector(".text-input").value = "";
    document.querySelector("#updateTaskId").value = "";

    document.querySelector(".edit").style.display = "none";
    document.querySelector(".cancel").style.display = "none";
    document.querySelector(".insert-input").style.display = "block";
};

//canceling the task edit
UI.prototype.cancelTask = function (e){
    document.querySelector(".text-input").value = "";
    document.querySelector("#updateTaskId").value = "";

    document.querySelector(".edit").style.display = "none";
    document.querySelector(".cancel").style.display = "none";
    document.querySelector(".insert-input").style.display = "block";
}


export default UI;