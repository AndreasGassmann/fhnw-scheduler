import {Pipe} from 'angular2/core';
import {Lecture} from "../classes/lecture.class";

@Pipe({name: 'resize'})
export class ResizePipe{
    transform(url: string): string {
        return "http://resize.papers.ch/?src=" + encodeURI(url) + "&width=80&height=80&crop-to-fit";
    }
}