import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/module-detail/module-detail.html'
})
export class ModuleDetailPage {
  name: string;

  constructor() {
    this.name = "TestModul";
  }
}
