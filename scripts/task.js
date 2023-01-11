//task(id,title,completed)

function Task(title){
    this.id = new Date().toLocaleString();
    this.title = title;
    this.complete = false;
}

export default Task;