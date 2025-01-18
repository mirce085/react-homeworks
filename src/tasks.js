import Task from "./models/Task";
import {store} from "./redux/store";

export async function getTasks(query) {
    let tasks = localStorage.getItem("tasks");
    if (tasks === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
        return localStorage.getItem("tasks");
    }

    tasks = JSON.parse(tasks);
    if(query) {
        tasks = tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase()));
    }
    return tasks;
}

export async function createTask() {
    let tasks = await getTasks();
    let id = Math.random()
        .toString(36)
        .substring(2, 9);

    let task = new Task(id);

    tasks.unshift(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
}

export async function getTask(id) {
    let tasks = await getTasks();

    let task = tasks.find(task => task.id === id);
    console.log(task);
    return task;
}

export async function updateTask(id, updates) {
    let tasks = await getTasks();
    let task = await getTask(id);

    let index = tasks.findIndex((task) => task.id === id);

    if (!task) throw new Error('No contact found for', id);

    Object.assign(task, updates);

    tasks[index] = task;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return task;
}

export async function deleteTask(id) {
    let tasks = await getTasks();
    let index = tasks.findIndex(contact => contact.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        return true;
    }
    return false;
}


