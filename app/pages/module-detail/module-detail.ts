import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleService} from '../../services/module.service';
import {MyModulesService} from '../../services/my-modules.service';

@Page({
  templateUrl: 'build/pages/module-detail/module-detail.html',
  providers: [ModuleService, MyModulesService]
})
export class ModuleDetailPage {
  selectedItem: number;
  id: number;
  short: string;
  description: string;
  hasModule: boolean;

  _myModulesService: MyModulesService;

  constructor(private nav: NavController, navParams: NavParams, _moduleService: ModuleService, _myModulesService: MyModulesService) {
    this.nav = nav;
    this._myModulesService = _myModulesService;
    this.hasModule = false;

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

  }

  toggleModule() {
    this._myModulesService.toggleModule(this.id);
  }
}
