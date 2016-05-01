import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Lecture} from "../classes/lecture.class";

@Injectable()
export class MyLecturesService {
    lectures: Array<{id: number, c: Lecture}>;

    constructor() {
        this.lectures = JSON.parse(localStorage.getItem('myLectures'));
        this.lectures = this.lectures ? this.lectures : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('myLectures', JSON.stringify(this.lectures));
    }

    addLecture(id: number, c: Lecture) {
        if (!this.lectures.find(c => c.id === id)) {
            this.lectures.push({id: id, c: c});
        }
        this.saveToLocalStorage();
    }

    removeLecture(id: number) {
        this.lectures = this.lectures.filter(c => c.id !== id);
        this.saveToLocalStorage();
    }

    hasLecture(id: number): boolean {
        return this.lectures.find(c => c.id === id) ? true : false; //TODO: use .include(id), requires ts update
    }

    getLectures() {
        return this.lectures;
    }

    getStructuredLectures(){
        var arr :  { [id: number] : Lecture[]; } = {};
        this.lectures.forEach((l) =>{
            if(arr[l.c.day] == undefined){
                arr[l.c.day] = [];
            }
            arr[l.c.day].push(l.c);
            console.log(l.c);
        });
        return arr;
    }

    toggleLecture(id: number, c: any) {
        if (this.hasLecture(id)) {
            this.removeLecture(id);
        } else {
            this.addLecture(id, c);
        }
    }
}