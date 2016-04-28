import {Page, NavController} from 'ionic-angular';
import {MyLecturesService} from '../../services/my-lectures.service.ts';

import {LectureDetailPage} from '../lecture-detail/lecture-detail';

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
  templateUrl: 'build/pages/my-modules/my-modules.html',
  providers: [MyLecturesService]
})
export class MyModulesPage {
  myLectures: Array<{ id: number, c: ILecture }>;

  constructor(private nav: NavController, _myLecturesService: MyLecturesService) {
    this.myLectures = _myLecturesService.getLectures();
  }

  itemTapped(event, id) {
    this.nav.push(LectureDetailPage, {
      lectureId: id
    })
  }

}
