import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Task} from "../classes/task.class";

@Injectable()
export class MyTasksService {
    tasks: Array<{id: number, t: Task}>;

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('myTasks'));
        this.tasks = this.tasks ? this.tasks : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('myTasks', JSON.stringify(this.tasks));
    }

    addTask(id: number, t: Task) {
        if (!this.tasks.find(t => t.id === id)) {
            this.tasks.push({id: id, t: t});
        }
        this.saveToLocalStorage();
    }

    removeTask(id: number) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToLocalStorage();
    }

    hasTask(id: number): boolean {
        return this.tasks.find(t => t.id === id) ? true : false; //TODO: use .include(id), requires ts update
    }

    getTasks() {
        return this.tasks;
    }

    toggleTask(id: number, t: any) {
        if (this.hasTask(id)) {
            this.removeTask(id);
        } else {
            this.addTask(id, t);
        }
    }
}