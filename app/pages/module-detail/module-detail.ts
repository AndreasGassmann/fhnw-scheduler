import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';
import {MyModulesService} from '../../services/my-modules.service';
import {ClassService} from '../../services/class.service';

@Page({
  templateUrl: 'build/pages/module-detail/module-detail.html',
  providers: [ModuleService, MyModulesService, ClassService]
})
export class ModuleDetailPage {
  selectedItem: number;
  id: number;
  short: string;
  description: string;
  hasModule: boolean;
  classes: Array<{
    idevent: number,
    starttime: string,
    endtime: string,
    building: number,
    room: string,
    classname: string,
    responsible: string,
    moduleId: number
  }>;

  _myModulesService: MyModulesService;

  constructor(private nav: NavController, navParams: NavParams, _moduleService: ModuleService, _myModulesService: MyModulesService, _classService: ClassService) {
    this.nav = nav;
    this._myModulesService = _myModulesService;

    this.selectedItem = navParams.get('moduleId');

    this.hasModule = _myModulesService.hasModule(this.selectedItem);

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

  toggleModule() {
    this._myModulesService.toggleModule(this.id);
  }
}
