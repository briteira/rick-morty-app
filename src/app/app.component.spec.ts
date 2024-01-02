import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      AppComponent, 
      HeaderComponent
    ],
    imports: [
      TranslateModule.forRoot(),
      RouterModule,
      MatIconModule
    ],
    providers: [
      BsModalService
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rick-morty-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rick-morty-app');
  });
});
