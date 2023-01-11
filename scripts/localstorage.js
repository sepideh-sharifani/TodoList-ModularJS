function LS(){
}

//change data to JSON format (to check if there is any data here)
LS.prototype.fetch = function(){
    //gets a key name ('tasks')
    let tasks = localStorage.getItem('tasks');
    if(tasks){
        //turn it into an object readable for js 
        tasks = JSON.parse(tasks);
    }else{
        //when there is no task, there would be an empty array
        tasks = [];
    }   
    return tasks;
};

//add the data to local storage while changing it to the 
LS.prototype.store = function(task){
    let tasks = this.fetch();
    tasks.push(task);
    //convert the data to string
    localStorage.setItem('tasks',JSON.stringify(tasks));
};

//to delete a task from local storage
LS.prototype.delete = function(id){
    let tasks = this.fetch();
    let index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//to mark it as checked or not
LS.prototype.check = function(id){
    let tasks = this.fetch();
    let index = tasks.findIndex((task) => task.id === id);
    if(tasks[index].complete){
        tasks[index].complete = false;
    }else{
        tasks[index].complete = true;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// to find the task we want to edit from the local storage list
LS.prototype.findTask = function (id){
    let tasks = this.fetch();
    return tasks.find((task) => task.id === id);
}

//updating the task
LS.prototype.updateTask = function(id, title){
    let tasks = this.fetch();
    let index = tasks.findIndex((task) => task.id === id);
    tasks[index].title = title;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default LS; 