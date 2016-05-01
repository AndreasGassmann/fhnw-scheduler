import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Lecture} from "../classes/lecture.class";
import {Module} from "../classes/module.class";

@Injectable()
export class MyLecturesService {
    lectures: Array<{id: number, l: Lecture}>;

    constructor() {
        this.lectures = JSON.parse(localStorage.getItem('myLectures'));
        this.lectures = this.lectures ? this.lectures : [];
    }

    saveToLocalStorage() {
        localStorage.setItem('myLectures', JSON.stringify(this.lectures));
    }

    addLecture(id: number, l: Lecture, m: Module) {
        if (!this.lectures.find(l => l.id === id)) {
            l.module = m;
            this.lectures.push({id: id, l: l});
        }
        this.saveToLocalStorage();
    }

    removeLecture(id: number) {
        this.lectures = this.lectures.filter(l => l.id !== id);
        this.saveToLocalStorage();
    }

    hasLecture(id: number): boolean {
        return this.lectures.find(l => l.id === id) ? true : false; //TODO: use .include(id), requires ts update
    }

    getLectures() {
        return this.lectures;
    }

    getLectureById(id:number): Lecture {
        console.log(this.lectures[id]);
        return this.lectures[id].l;
    }

    getStructuredLectures(){
        var arr :  { [id: number] : Lecture[]; } = {};
        this.lectures.forEach((l) =>{
            if(arr[l.l.day] == undefined){
                arr[l.l.day] = [];
            }
            arr[l.l.day].push(l.l);
        });
        return arr;
    }

    toggleLecture(id: number, l: Lecture, m:Module) {
        if (this.hasLecture(id)) {
            this.removeLecture(id);
        } else {
            this.addLecture(id, l, m);
        }
    }
}