import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Lecture} from "../classes/lecture.class";

@Injectable()
export class LectureService {
    http: Http;
    headers: Headers;

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getLecturesByModuleId(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/lecture?module_idmodule=' + id)
            .map(this.extractDataLectures)
            .catch(this.handleError);
    }

    getLectureById(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/lecture/' + id)
            .map(this.extractDataLecture)
            .catch(this.handleError);
    }

    public postLecture(lecture: Lecture): Observable<any>{
        return this.http.post("http://fhnw.papers.ch/apigility/public/v1/lecture", lecture.toString(), {
            headers: this.headers
        });
    }

    private extractDataLectures(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        console.log(body);
        return body._embedded.lecture || { };
    }

    private extractDataLecture(res) {
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