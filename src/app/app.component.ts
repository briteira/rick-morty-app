import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rick-morty-app';

  isUserAuthenticated: boolean = false;

  constructor(
    public translate: TranslateService,
    public authService: AuthService
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');

    this.isUserAuthenticated = this.authService.isAuthenticated();
  }
}
