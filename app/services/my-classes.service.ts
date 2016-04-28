import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

interface IClass {
    idevent: number,
    starttime: string,
    endtime: string,
    building: number,
    room: string,
    classname: string,
    responsible: string,
    moduleId: number
}

@Injectable()
export class MyClassesService {
    classes: Array<{id: number, c: IClass}>;

    constructor() {
        this.classes = JSON.parse(localStorage.getItem('myClasses'));
        this.classes = this.classes ? this.classes : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('myClasses', JSON.stringify(this.classes));
    }

    addClass(id: number, c: IClass) {
        if (!this.classes.find(c => c.id === id)) {
            this.classes.push({id: id, c: c});
        }
        this.saveToLocalStorage();
    }

    removeClass(id: number) {
        this.classes = this.classes.filter(c => c.id !== id);
        this.saveToLocalStorage();
    }

    hasClass(id: number): boolean {
        return this.classes.find(c => c.id === id) ? true : false; //TODO: use .include(id), requires ts update
    }

    getClasses() {
        return this.classes;
    }

    toggleClass(id: number, c: any) {
        if (this.hasClass(id)) {
            this.removeClass(id);
        } else {
            this.addClass(id, c);
        }
    }
}