import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MenuService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getMenues(): Observable<any> {
        return this.http.get('https://www.cs.technik.fhnw.ch/App4Technik/mensa/')
            .map(this.extractDataMenues)
            .catch(this.handleError);
    }


    private extractDataMenues(res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        console.log(body);
        return body.menues || { };
    }


    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}