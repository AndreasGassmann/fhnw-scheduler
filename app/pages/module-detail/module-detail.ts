import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';
import {MyLecturesService} from '../../services/my-lectures.service.ts';
import {LectureService} from '../../services/lecture.service';

import {LectureDetailPage} from '../lecture-detail/lecture-detail';
import {AddLectureModalPage} from "../add-lecture-modal/add-lecture-modal";
import {Lecture} from "../../classes/lecture.class";
import {AvatarPipe} from "../../pipes/fhnwavatar.pipe";
import {Module} from "../../classes/module.class";

@Page({
    templateUrl: 'build/pages/module-detail/module-detail.html',
    providers: [ModuleService, MyLecturesService, LectureService],
    pipes: [AvatarPipe]

})
export class ModuleDetailPage {
    module:Module;
    lectures:Array<Lecture>;

    _myLecturesService:MyLecturesService;

    addLectureModalPage:typeof AddLectureModalPage;

    constructor(private nav:NavController, navParams:NavParams, _moduleService:ModuleService, _myLecturesService:MyLecturesService, _lectureService:LectureService) {
        this.nav = nav;
        this._myLecturesService = _myLecturesService;

        this.addLectureModalPage = AddLectureModalPage;

        _moduleService.getModuleById(navParams.get('moduleId'))
            .subscribe(
                module => this.module = module,
                error => console.log(error)
            );

        _lectureService.getLecturesByModuleId(navParams.get('moduleId'))
            .subscribe(
                lectures => {
                    this.lectures = lectures;
                },
                error => console.log(error)
            );
    }

    hasLecture(id: number) {
        return this._myLecturesService.hasLecture(id);
    }

    toggleLecture(l: Lecture) {
        this._myLecturesService.toggleLecture(l.idlecture, l, this.module);
    }

}
