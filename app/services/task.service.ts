import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Task} from "../classes/task.class";

@Injectable()
export class TaskService {
    http: Http;
    headers: Headers;

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getTasksByLecture(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/task?lecture_idlecture=' + id)
            .map(this.extractDataTasks)
            .catch(this.handleError);
    }

    public postTask(task: Task): Observable<any>{
        return this.http.post("http://fhnw.papers.ch/apigility/public/v1/task", task.toString(), {
            headers: this.headers
        });
    }

    private extractDataTasks(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body._embedded.task || { };
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}