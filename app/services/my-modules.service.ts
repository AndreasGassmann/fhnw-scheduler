import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyModulesService {
    modules: Array<number>;

    constructor() { }

    addModule(id: number) {
        if (!this.modules.find(module => module === id)) {
            this.modules.push(id);
        }
    }

    removeModule(id: number) {
        this.modules = this.modules.filter(module => module !== id);
    }

    hasModule(id: number): boolean {
        return this.modules.find(module => module === id) ? true : false;
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