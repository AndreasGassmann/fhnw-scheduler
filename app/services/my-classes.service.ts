import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyClassesService {
    classes: Array<number>;

    constructor() {
        this.classes = JSON.parse(localStorage.getItem('myClasses'));
        this.classes = this.classes ? this.classes : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('myClasses', JSON.stringify(this.classes));
    }

    addClass(id: number) {
        if (!this.classes.find(c => c === id)) {
            this.classes.push(id);
        }
        this.saveToLocalStorage();
    }

    removeClass(id: number) {
        this.classes = this.classes.filter(c => c !== id);
        this.saveToLocalStorage();
    }

    hasClass(id: number): boolean {
        console.log('Checking: ' + id);
        console.log(this.classes.find(c => c === id) ? true : false);
        return this.classes.find(c => c === id) ? true : false; //TODO: use .include(id), requires ts update
    }

    getClasses() {
        return this.classes;
    }

    toggleClass(id: number) {
        if (this.hasClass(id)) {
            this.removeClass(id);
        } else {
            this.addClass(id);
        }
    }
}