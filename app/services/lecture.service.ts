import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LectureService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getLecturesByModule(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/lecture?modul_idmodul=' + id)
            .map(this.extractDataLectures)
            .catch(this.handleError);
    }

    getLectureById(id: number): Observable<any> {
        return this.http.get('http://fhnw.papers.ch/apigility/public/v1/lecture/' + id)
            .map(this.extractDataLecture)
            .catch(this.handleError);
    }

    private extractDataLectures(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

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