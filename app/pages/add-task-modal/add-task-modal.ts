import {Page, Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {TaskService} from '../../services/task.service';

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
  templateUrl: 'build/pages/add-task-modal/add-task-modal.html',
  providers: [TaskService]
})
export class AddTaskModalPage {
    title: string;
    description: string;
    due: string;
    mandatory: boolean;
    lecture_idlecture: number;

    viewCtrl: ViewController;

    _myTaskService: TaskService;

  constructor(viewCtrl: ViewController, _myTaskService: TaskService) {
      this.viewCtrl = viewCtrl;
      this._myTaskService = _myTaskService;
  }

    addTask() {
        this._myTaskService.addTask(this.title, this.description, this.due, this.mandatory, this.lecture_idlecture, () => {});
        console.log(this.title);
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
