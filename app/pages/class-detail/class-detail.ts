import {Page, NavController, NavParams} from 'ionic-angular';
import {MyClassesService} from '../../services/my-classes.service.ts';
import {TaskService} from '../../services/task.service';
import {ClassService} from '../../services/class.service';

interface IClass {
    idevent: number,
    starttime: string,
    endtime: string,
    building: number,
    room: string,
    classname: string,
    responsible: string,
    moduleId: number
}

@Page({
  templateUrl: 'build/pages/class-detail/class-detail.html',
  providers: [TaskService, MyClassesService, ClassService]
})
export class ClassDetailPage {
    selectedItem: number;

    idevent: number;
    starttime: string;
    endtime: string;
    building: number;
    room: string;
    classname: string;
    responsible: string;
    moduleId: number;

    myClass: IClass;

    hasClass: boolean;
    tasks: any;

    _myClassesService: MyClassesService;

  constructor(private nav: NavController, navParams: NavParams, _myClassesService: MyClassesService, _taskService: TaskService, _classService: ClassService) {
    this.nav = nav;
    this._myClassesService = _myClassesService;

    this.selectedItem = navParams.get('classId');

      this.hasClass = this._myClassesService.hasClass(this.selectedItem);
      console.log(this.hasClass);

    _classService.getClassById(this.selectedItem)
        .subscribe(
            c => {
                this.idevent = c.idevent;
                this.starttime = c.starttime;
                this.endtime = c.endtime;
                this.building = c.building;
                this.room = c.room;
                this.classname = c.classname;
                this.responsible = c.responsible;
                this.moduleId = c.moduleId;
                this.myClass = c;
            },
            error =>  console.log(error)
        );

      _taskService.getTasksByClass(this.selectedItem)
          .subscribe(
              t => {
                  this.tasks = t;
              },
              error =>  console.log(error)
          );
  }

  toggleClass() {
    this._myClassesService.toggleClass(this.idevent, this.myClass);
  }
}
