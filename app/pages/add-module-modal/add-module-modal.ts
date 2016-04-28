import {Page, Modal, NavController, ViewController} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';

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
  templateUrl: 'build/pages/add-module-modal/add-module-modal.html',
  providers: [ModuleService]
})
export class AddModuleModalPage {

    viewCtrl: ViewController;

  constructor(viewCtrl: ViewController,_myModuleService: ModuleService) {
      this.viewCtrl = viewCtrl;
  }

    close() {
        this.viewCtrl.dismiss();
    }
}
