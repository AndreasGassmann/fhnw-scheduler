import {Page, NavController, NavParams} from 'ionic-angular';
import {SettingsService} from '../../services/settings.service';

@Page({
  templateUrl: 'build/pages/settings-list/settings-list.html',
  providers: [SettingsService]
})
export class SettingsListPage {
  _settingsService: SettingsService;
  settings: any;

  constructor(private nav: NavController, navParams: NavParams, _settingsService: SettingsService) {
    this.nav = nav;
    this._settingsService = _settingsService;
    this.settings = _settingsService.getSettings();
  }

  saveSettings($event) {};
}
