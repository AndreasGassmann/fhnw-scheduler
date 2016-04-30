import {Page, NavController} from 'ionic-angular';
import {MyLecturesService} from '../../services/my-lectures.service.ts';

import {LectureDetailPage} from '../lecture-detail/lecture-detail';
import {Lecture} from "../../classes/lecture.class";

@Page({
  templateUrl: 'build/pages/my-modules/my-modules.html',
  providers: [MyLecturesService]
})
export class MyModulesPage {
  myLectures: Array<{ id: number, c: Lecture }>;

  constructor(private nav: NavController, _myLecturesService: MyLecturesService) {
    this.myLectures = _myLecturesService.getLectures();
  }

  itemTapped(event, id) {
    this.nav.push(LectureDetailPage, {
      lectureId: id
    })
  }

}
