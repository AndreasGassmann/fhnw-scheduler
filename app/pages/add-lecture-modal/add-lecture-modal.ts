import {Page, Modal, NavController, ViewController} from 'ionic-angular';
import {LectureService} from '../../services/lecture.service';
import {Lecture} from "../../classes/lecture.class";

@Page({
  templateUrl: 'build/pages/add-lecture-modal/add-lecture-modal.html',
  providers: [LectureService]
})
export class AddLectureModalPage {

    viewCtrl: ViewController;

    _myLectureService: LectureService;

    lecture: Lecture;

  constructor(viewCtrl: ViewController,_myLectureService: LectureService) {
      this.viewCtrl = viewCtrl;
      this._myLectureService = _myLectureService;
  }

    addLecture() {
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
