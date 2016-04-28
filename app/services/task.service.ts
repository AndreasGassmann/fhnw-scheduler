import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TaskService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getTasksByLecture(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/event?modul_idmodul=' + id)
            .map(this.extractDataTasks)
            .catch(this.handleError);
    }

    private extractDataTasks(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body._embedded.event || { };
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}