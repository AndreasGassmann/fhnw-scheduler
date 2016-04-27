import {Page} from 'ionic-angular';
import {MyClassesService} from '../../services/my-classes.service.ts';


@Page({
  templateUrl: 'build/pages/my-modules/my-modules.html',
  providers: [MyClassesService]
})
export class MyModulesPage {
  myClasses: Array<number>;

  constructor(_myClassesService: MyClassesService) {
    this.myClasses = _myClassesService.getClasses();
  }
}
