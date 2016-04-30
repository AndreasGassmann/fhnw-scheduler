import {Page, Modal, NavController, ViewController} from 'ionic-angular';
import {LectureService} from '../../services/lecture.service';

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
  templateUrl: 'build/pages/add-lecture-modal/add-lecture-modal.html',
  providers: [LectureService]
})
export class AddLectureModalPage {

    viewCtrl: ViewController;

  constructor(viewCtrl: ViewController,_myLectureService: LectureService) {
      this.viewCtrl = viewCtrl;
  }

    close() {
        this.viewCtrl.dismiss();
    }
}
