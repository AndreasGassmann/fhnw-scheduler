import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';
import {MyLecturesService} from '../../services/my-lectures.service.ts';
import {LectureService} from '../../services/lecture.service';

import {LectureDetailPage} from '../lecture-detail/lecture-detail';
import {AddLectureModalPage} from "../add-lecture-modal/add-lecture-modal";
import {Lecture} from "../../classes/lecture.class";
import {AvatarPipe} from "../../pipes/fhnwavatar.pipe";

@Page({
    templateUrl: 'build/pages/module-detail/module-detail.html',
    providers: [ModuleService, MyLecturesService, LectureService],
    pipes: [AvatarPipe]

})
export class ModuleDetailPage {
    selectedItem:number;
    id:number;
    short:string;
    description:string;
    lectures:Array<Lecture>;

    _myLecturesService:MyLecturesService;

    addLectureModalPage:typeof AddLectureModalPage;
    lectureParams:{idmodule: number};

    constructor(private nav:NavController, navParams:NavParams, _moduleService:ModuleService, _myLecturesService:MyLecturesService, _lectureService:LectureService) {
        this.nav = nav;
        this._myLecturesService = _myLecturesService;

        this.addLectureModalPage = AddLectureModalPage;

        this.selectedItem = navParams.get('moduleId');
        this.lectureParams = {idmodule: this.selectedItem};

        _moduleService.getModuleById(this.selectedItem)
            .subscribe(
                module => {
                    this.id = module.idmodule;
                    this.short = module.short;
                    this.description = module.description;
                },
                error => console.log(error)
            );

        _lectureService.getLecturesByModule(this.selectedItem)
            .subscribe(
                lectures => {
                    this.lectures = lectures;
                },
                error => console.log(error)
            );
    }

    hasLecture(id:number) {
        return this._myLecturesService.hasLecture(id);
    }

    toggleLecture(c:Lecture) {
        this._myLecturesService.toggleLecture(c.idlecture, c);
    }

}
