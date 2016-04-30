import {Page, NavController, NavParams} from 'ionic-angular';
import {MyLecturesService} from '../../services/my-lectures.service.ts';
import {TaskService} from '../../services/task.service';
import {LectureService} from '../../services/lecture.service';
import {AddTaskModalPage} from "../add-task-modal/add-task-modal";

interface ILecture {
    idlecture: number,
    starttime: string,
    endtime: string,
    building: number,
    room: string,
    classname: string,
    responsible: string,
    moduleId: number
}

@Page({
  templateUrl: 'build/pages/lecture-detail/lecture-detail.html',
  providers: [TaskService, MyLecturesService, LectureService]
})
export class LectureDetailPage {
    selectedItem: number;

    idlecture: number;
    starttime: string;
    endtime: string;
    building: number;
    room: string;
    classname: string;
    responsible: string;
    moduleId: number;

    myLecture: ILecture;

    hasLecture: boolean;
    tasks: any;

    _myLecturesService: MyLecturesService;

    addTaskModalPage: typeof AddTaskModalPage;
    taskParams: {idlecture: number};

  constructor(private nav: NavController, navParams: NavParams, _myLecturesService: MyLecturesService, _taskService: TaskService, _lectureService: LectureService) {
    this.nav = nav;
    this._myLecturesService = _myLecturesService;

    this.addTaskModalPage = AddTaskModalPage;

    this.selectedItem = navParams.get('lectureId');

      this.taskParams = {idlecture: this.selectedItem};

      this.hasLecture = this._myLecturesService.hasLecture(this.selectedItem);
      console.log(this.hasLecture);

    _lectureService.getLectureById(this.selectedItem)
        .subscribe(
            lecture => {
                this.idlecture = lecture.idlecture;
                this.starttime = lecture.starttime;
                this.endtime = lecture.endtime;
                this.building = lecture.building;
                this.room = lecture.room;
                this.classname = lecture.classname;
                this.responsible = lecture.responsible;
                this.moduleId = lecture.moduleId;
                this.myLecture = lecture;
            },
            error =>  console.log(error)
        );

      _taskService.getTasksByLecture(this.selectedItem)
          .subscribe(
              t => {
                  this.tasks = t;
              },
              error =>  console.log(error)
          );
  }

  toggleLecture() {
    this._myLecturesService.toggleLecture(this.idlecture, this.myLecture);
  }
}
