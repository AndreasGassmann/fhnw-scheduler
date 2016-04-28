import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleDetailPage} from '../module-detail/module-detail';
import {ModuleService} from '../../services/module.service';
import {AddModuleModalPage} from "../add-module-modal/add-module-modal";

@Page({
  templateUrl: 'build/pages/module-list/module-list.html',
  providers: [ModuleService]
})
export class ModuleListPage {
  selectedItem: any;
  icons: string[];
  searchQuery: string;
  modules: Array<{idmodul: number, description: string, short: string}>;
  allModules: Array<{idmodul: number, description: string, short: string}>;

  constructor(private nav: NavController, navParams: NavParams, _moduleService: ModuleService) {
    this.nav = nav;
    this.searchQuery = '';

    _moduleService.getModules()
      .subscribe(
        modules => {this.modules = modules; this.allModules = modules},
        error =>  console.log(error)
      );

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
  }

  getItems(searchbar) {

    this.modules = this.allModules

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
      return;
    }

    this.modules = this.modules.filter((v) => {
      if (v.short.toLocaleLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  itemTapped(event, id) {
    this.nav.push(ModuleDetailPage, {
      moduleId: id
    })
  }

  itemAdd() {
    this.nav.push(AddModuleModalPage);
  }


}
