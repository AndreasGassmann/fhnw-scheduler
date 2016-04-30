import {Page, Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {TaskService} from '../../services/task.service';
import {Task} from "../../classes/task.class";

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
    task: Task;

    viewCtrl: ViewController;

    _myTaskService: TaskService;

  constructor(navParams: NavParams, viewCtrl: ViewController, _myTaskService: TaskService) {
      this.viewCtrl = viewCtrl;
      this._myTaskService = _myTaskService;
      this.task = new Task();
      this.task.lecture_idlecture = navParams.get('idlecture');
  }

    addTask() {
        this._myTaskService.postTask(this.task)
            .map(res => res.json())
            .subscribe(
                data => this.close(),
                error => console.log(error),
                () => this.close()
            );
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
