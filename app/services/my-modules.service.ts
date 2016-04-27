import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyModulesService {
    modules: Array<number>;

    constructor() {
        this.modules = JSON.parse(localStorage.getItem('myModules'));
        this.modules = this.modules ? this.modules : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('myModules', JSON.stringify(this.modules));
    }

    addModule(id: number) {
        if (!this.modules.find(module => module === id)) {
            this.modules.push(id);
        }
        this.saveToLocalStorage();
    }

    removeModule(id: number) {
        this.modules = this.modules.filter(module => module !== id);
        this.saveToLocalStorage();
    }

    hasModule(id: number): boolean {
        console.log('Checking: ' + id);
        console.log(this.modules.find(module => module === id) ? true : false);
        return this.modules.find(module => module === id) ? true : false; //TODO: use .include(id), requires ts update
    }

    getModules() {
        return this.modules;
    }

    toggleModule(id: number) {
        if (this.hasModule(id)) {
            this.removeModule(id);
        } else {
            this.addModule(id);
        }
    }
}