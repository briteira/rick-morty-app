/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatIconModule } from '@angular/material/icon';
import { usersMock } from 'src/app/mocks/users.mock';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let modalService: BsModalService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        TranslateModule.forRoot(),
        MatIconModule
      ],
      providers: [
        BsModalService,
      ]
    })
    .compileComponents();

    modalService = TestBed.inject(BsModalService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve abrir o modal de confirmação ao chamar openModalLogout', () => {
    const template = {} as any;

    const showSpy = spyOn(modalService, 'show').and.returnValue({
      content: {},
      hide: () => {},
    } as BsModalRef);

    component.userAuthenticated = usersMock[0];

    component.openModalLogout(template);

    expect(showSpy).toHaveBeenCalledWith(template, { class: 'modal-sm' });
  });

  it('deve fechar o modal de confirmação ao cancelar', () => {
    const template = {} as any;

    const modalRef = {
      content: {},
      hide: jasmine.createSpy('hide'),
    } as unknown as BsModalRef;

    const showSpy = spyOn(modalService, 'show').and.returnValue(modalRef);

    component.userAuthenticated = usersMock[0];

    component.openModalLogout(template);

    component.decline();

    expect(modalRef.hide).toHaveBeenCalled();    
  })

  it('deve exibir o botao para logout apenas quando usuario estiver logado', () => {
    component.userAuthenticated = usersMock[0];
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('#btn-abrir-modal-logout'));
    expect(logoutButton).toBeTruthy();

    component.userAuthenticated = null;
    fixture.detectChanges();

    const logoutButtonAfterLogout = fixture.debugElement.query(By.css('#btn-abrir-modal-logout'));
    expect(logoutButtonAfterLogout).toBeNull();
  });
});
