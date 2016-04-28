import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';
import {MyClassesService} from '../../services/my-classes.service.ts';
import {ClassService} from '../../services/class.service';

interface IClass {
    idevent: number,
    starttime: string,
    endtime: string,
    building: number,
    room: string,
    classname: string,
    responsible: string,
    moduleId: number
}

@Page({
  templateUrl: 'build/pages/module-detail/module-detail.html',
  providers: [ModuleService, MyClassesService, ClassService]
})
export class ModuleDetailPage {
  selectedItem: number;
  id: number;
  short: string;
  description: string;
  classes: Array<IClass>;

  _myClassesService: MyClassesService;

  constructor(private nav: NavController, navParams: NavParams, _moduleService: ModuleService, _myClassesService: MyClassesService, _classService: ClassService) {
    this.nav = nav;
    this._myClassesService = _myClassesService;

    this.selectedItem = navParams.get('moduleId');

    _moduleService.getModuleById(this.selectedItem)
        .subscribe(
            module => {
              this.id = module.idmodul;
              this.short = module.short;
              this.description = module.description;

            },
            error =>  console.log(error)
        );

    _classService.getClassesByModule(this.selectedItem)
        .subscribe(
            classes => {
              this.classes = classes;
            },
            error =>  console.log(error)
        );
  }

  hasClass(id: number) {
    return this._myClassesService.hasClass(id);
  }

  toggleClass(c: IClass) {
    this._myClassesService.toggleClass(c.idevent, c);
  }
}
