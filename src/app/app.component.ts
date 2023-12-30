import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'rick-morty-app';

  isUserAuthenticated: boolean = false;

  private authSubscription: Subscription;

  constructor(
    public translate: TranslateService,
    public authService: AuthService
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');

    this.authSubscription = this.authService.authChange$.subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
