//creating 3 constructor function 1.Task(id, title, completed) 2.UI  3. LocalStorage
import Task from './task.js';
import UI from './ui.js';



//creating an object for the ui
const ui = new UI();

ui.showAllTasks();


//what happens when the enter button is clicked
document.querySelector(".insert-input").addEventListener('click', (e) => {

    const inputTask = document.querySelector(".text-input").value;
    if (inputTask.length > 0) {
        const task = new Task(inputTask);
        ui.add(task);
        ui.resetArea();}   
});

//what happens when the Icons for each task is entered (check,delete,edit)
document.querySelector(".todolist").addEventListener('click', (e) => {

    if (e.target.className.includes("deleteIcon")) {
    ui.delete(e);
    }

    if (e.target.className.includes("check")) {
        ui.mark(e);
    }

    if (e.target.className.includes("editIcon")) {
        ui.edit(e);
    }

});

//what happens when edit button is clicked
document.querySelector(".edit").addEventListener('click', (e) => {
    ui.updateTask(e);
});

//what happens when edit button is clicked
document.querySelector(".cancel").addEventListener('click', (e) => {
    ui.cancelTask(e);
});
