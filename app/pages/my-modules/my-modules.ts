import {Page, NavController} from 'ionic-angular';
import {MyLecturesService} from '../../services/my-lectures.service.ts';

import {LectureDetailPage} from '../lecture-detail/lecture-detail';
import {Lecture} from "../../classes/lecture.class";
import {MenuService} from "../../services/menu.service";
import {Menu} from "../../classes/menu.class";
import {AvatarPipe} from "../../pipes/fhnwavatar.pipe";
import {ResizePipe} from "../../pipes/resize.pipe";
import {TruncatePipe} from "../../pipes/truncate.pipe";

@Page({
  templateUrl: 'build/pages/my-modules/my-modules.html',
  providers: [MyLecturesService, MenuService],
  pipes: [AvatarPipe, ResizePipe, TruncatePipe]
})
export class MyModulesPage {
  myLectures: { [day:number]:Array<Lecture>; } = {};
  menues: Array<Menu> = [];
  days: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];


  constructor(private nav: NavController, _myLecturesService: MyLecturesService, _myMenuesService: MenuService) {
    this.myLectures = _myLecturesService.getStructuredLectures();
    _myMenuesService.getMenues()
        .subscribe(
            menues => this.menues = menues,
            error =>  console.log(error)
        );
  }

  itemTapped(event, id) {
    this.nav.push(LectureDetailPage, {
      lectureId: id
    })
  }

}
