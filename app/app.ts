import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {MyModulesPage} from './pages/my-modules/my-modules';
import {ModuleListPage} from './pages/module-list/module-list';
import {ModuleDetailPage} from './pages/module-detail/module-detail';

import 'rxjs/Rx';

@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: any = MyModulesPage;
  pages: Array<{title: string, component: any}>;

  constructor(private app: IonicApp, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Getting Started', component: MyModulesPage },
      { title: 'List', component: ModuleListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
