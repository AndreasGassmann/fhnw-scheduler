import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Module} from "../classes/module.class";

@Injectable()
export class ModuleService {
    modules: Array<any>;
    http: Http;
    headers: Headers;

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getModules(): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/module')
            .map(this.extractDataModules)
            .catch(this.handleError);
    }

    getModuleById(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/module/' + id)
            .map(this.extractDataModule)
            .catch(this.handleError);
    }

    public postModule(module: Module): Observable<any>{
        return this.http.post("http://fhnw.papers.ch/apigility/public/v1/module", module.toString(), {
            headers: this.headers
        });
    }

    private extractDataModules(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body._embedded.module || { };
    }

    private extractDataModule(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body || { };
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}