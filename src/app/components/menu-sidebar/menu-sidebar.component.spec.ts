/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuSidebarComponent } from './menu-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

describe('MenuSidebarComponent', () => {
  let component: MenuSidebarComponent;
  let fixture: ComponentFixture<MenuSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSidebarComponent,  ],
      imports: [ 
        RouterTestingModule, 
        HttpClientModule,
        TranslateModule.forRoot(),
        MatIconModule,
        TooltipModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
