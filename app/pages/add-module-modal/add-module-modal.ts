import {Page, Modal, NavController, ViewController} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';
import {Module} from "../../classes/module.class";
import {FormBuilder, Validators} from 'angular2/common';


@Page({
    templateUrl: 'build/pages/add-module-modal/add-module-modal.html',
    providers: [ModuleService]
})
export class AddModuleModalPage {
    module:Module;
    title:string;
    myModuleService:ModuleService;
    viewCtrl:ViewController;

    constructor(viewCtrl:ViewController, _myModuleService:ModuleService) {
        this.viewCtrl = viewCtrl;
        this.myModuleService = _myModuleService;
        this.module = new Module();
    }

    addModule() {
        this.myModuleService.postModule(this.module)
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
