/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocationFilterModalComponent } from './location-filter-modal.component';

describe('LocationFilterModalComponent', () => {
  let component: LocationFilterModalComponent;
  let fixture: ComponentFixture<LocationFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
