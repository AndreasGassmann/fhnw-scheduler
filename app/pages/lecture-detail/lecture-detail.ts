import {Page, NavController, NavParams} from 'ionic-angular';
import {MyLecturesService} from '../../services/my-lectures.service.ts';
import {TaskService} from '../../services/task.service';
import {LectureService} from '../../services/lecture.service';
import {AddTaskModalPage} from "../add-task-modal/add-task-modal";
import {MyTasksService} from "../../services/my-tasks.service";
import {Lecture} from "../../classes/lecture.class";
import {AvatarPipe} from "../../pipes/fhnwavatar.pipe";
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {ResizePipe} from "../../pipes/resize.pipe";

@Page({
    templateUrl: 'build/pages/lecture-detail/lecture-detail.html',
    providers: [TaskService, MyLecturesService, LectureService, MyTasksService],
    pipes: [AvatarPipe, TruncatePipe, ResizePipe]
})
export class LectureDetailPage {
    selectedItem:number;
    lecture: Lecture;

    hasLecture:boolean;
    tasks:any;

    _myLecturesService:MyLecturesService;

    _myTasksService:MyTasksService;

    addTaskModalPage:typeof AddTaskModalPage;
    taskParams:{idlecture: number};

    constructor(private nav:NavController, navParams:NavParams, _myLecturesService:MyLecturesService, _taskService:TaskService, _myTasksService:MyTasksService) {
        this.nav = nav;
        this._myLecturesService = _myLecturesService;
        this._myTasksService = _myTasksService;
        this.addTaskModalPage = AddTaskModalPage;

        this.hasLecture = this._myLecturesService.hasLecture(navParams.get('lectureId'));
        this.lecture = this._myLecturesService.getLectureById(navParams.get('lectureId'));

        _taskService.getTasksByLectureId(navParams.get('lectureId'))
            .subscribe(
                t => {
                    this.tasks = t;
                },
                error => console.log(error)
            );
    }

    hasTask(id:number) {
        return this._myTasksService.hasTask(id);
    }

    toggleTask(id:number) {
        this._myTasksService.toggleTask(id, this.lecture);
    }

    toggleLecture() {
        this._myLecturesService.toggleLecture(this.lecture.idlecture, this.lecture, this.lecture.module);
    }
}
