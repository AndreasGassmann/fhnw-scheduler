import {Page, Modal, NavController, ViewController} from 'ionic-angular';
import {LectureService} from '../../services/lecture.service';
import {Lecture} from "../../classes/lecture.class";
import {NavParams} from "ionic-angular/index";

@Page({
  templateUrl: 'build/pages/add-lecture-modal/add-lecture-modal.html',
  providers: [LectureService]
})
export class AddLectureModalPage {

    viewCtrl: ViewController;

    _myLectureService: LectureService;

    lecture: Lecture;

  constructor(navParams: NavParams, viewCtrl: ViewController,_myLectureService: LectureService) {
      this.viewCtrl = viewCtrl;
      this._myLectureService = _myLectureService;
      this.lecture = new Lecture();
      this.lecture.module_idmodule = navParams.get('idmodule');
  }

    addLecture() {
        this.lecture.starttime = this.lecture.starttime_hour + ":" + this.lecture.starttime_minute;
        this.lecture.endtime = this.lecture.endtime_hour + ":" + this.lecture.endtime_minute;

        this._myLectureService.postLecture(this.lecture)
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
