export default class Task {
    constructor(id) {
        this.id = id;
        this.name = "";
        this.text = "";
        this.isDone = false;
        this.createdAt = Date.now();
    }
}