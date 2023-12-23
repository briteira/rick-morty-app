import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rick-morty-app';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('pt');
    translate.use('pt');
}
}
