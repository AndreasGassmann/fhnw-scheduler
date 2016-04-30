import {Page, NavController} from 'ionic-angular';
import {MyLecturesService} from '../../services/my-lectures.service.ts';

import {LectureDetailPage} from '../lecture-detail/lecture-detail';
import {Lecture} from "../../classes/lecture.class";
import {MenuService} from "../../services/menu.service";
import {Menu} from "../../classes/menu.class";

@Page({
  templateUrl: 'build/pages/my-modules/my-modules.html',
  providers: [MyLecturesService, MenuService]
})
export class MyModulesPage {
  myLectures: Array<{ id: number, c: Lecture }>;
  menues: Array<Menu>;


  constructor(private nav: NavController, _myLecturesService: MyLecturesService, _myMenuesService: MenuService) {
    this.myLectures = _myLecturesService.getLectures();
    console.log(_myMenuesService.getMenues());
    _myMenuesService.getMenues()
        .subscribe(
            menues => {this.menues = menues; console.log(menues);},
            error =>  console.log(error)
        );
  }

  itemTapped(event, id) {
    this.nav.push(LectureDetailPage, {
      lectureId: id
    })
  }

}
