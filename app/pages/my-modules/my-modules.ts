import {Page, NavController} from 'ionic-angular';
import {MyClassesService} from '../../services/my-classes.service.ts';

import {ClassDetailPage} from '../class-detail/class-detail';

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
  templateUrl: 'build/pages/my-modules/my-modules.html',
  providers: [MyClassesService]
})
export class MyModulesPage {
  myClasses: Array<{ id: number, c: IClass }>;

  constructor(private nav: NavController, _myClassesService: MyClassesService) {
    this.myClasses = _myClassesService.getClasses();
  }

  itemTapped(event, id) {
    this.nav.push(ClassDetailPage, {
      classId: id
    })
  }

}
