import {Page, NavController, NavParams} from 'ionic-angular';
import {ModuleDetailPage} from '../module-detail/module-detail';
import {ModuleService} from '../../services/module.service';

@Page({
  templateUrl: 'build/pages/module-list/module-list.html',
  providers: [ModuleService]
})
export class ModuleListPage {
  selectedItem: any;
  icons: string[];
  modules: Array<{idmodul: number, description: string, short: string}>;

  constructor(private nav: NavController, navParams: NavParams, _moduleService: ModuleService) {
    this.nav = nav;

    _moduleService.getModules()
      .subscribe(
        modules => this.modules = modules,
        error =>  console.log(error)
      );

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

  }

  itemTapped(event, item) {
    this.nav.push(ModuleDetailPage, {
      item: item
    })
  }
}
