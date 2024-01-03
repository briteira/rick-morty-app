/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';

import { CharacterListComponent } from './character-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { MatIconModule } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { RickMortyResponseModel } from 'src/app/models/rick-morty-response.model';
import { CharacterModel } from 'src/app/models/character.model';
import { of } from 'rxjs';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let rickMortyServiceSpy: jasmine.SpyObj<RickMortyService>;

  beforeEach(async(() => {

    rickMortyServiceSpy = jasmine.createSpyObj('RickMortyService', ['getCharacters']);

    TestBed.configureTestingModule({
      declarations: [ CharacterListComponent, InputSearchComponent ],
      imports: [ 
        RouterTestingModule, 
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        MatIconModule,
        TooltipModule
      ],
      providers: [
        BsModalService,
        { provide: RickMortyService, useValue: rickMortyServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('deve chamar carregarDados durante a inicialização', () => {
    const mockResponse: RickMortyResponseModel<CharacterModel> = {
      results: [],
      info: { count: 0, pages: 1, next: '', prev: '' },
    };
  
    rickMortyServiceSpy.getCharacters.and.returnValue(of(mockResponse));
    
    fixture.detectChanges();
  
    expect(rickMortyServiceSpy.getCharacters).toHaveBeenCalled();
  });

  it('deve ajustar a altura da tabela corretamente após ngAfterViewInit', fakeAsync(() => {
    spyOn(component, 'ajustarAlturaTabela');
    
    fixture.detectChanges();
    tick();

    component.ngAfterViewInit();

    expect(component.ajustarAlturaTabela).toHaveBeenCalled();
  }));

  it('deve atualizar filtros e chamar carregarDados ao chamar aoBuscarInputSearch', fakeAsync(() => {
    spyOn(component, 'scrollToTop');
    spyOn(component, 'carregarDados');

    component.aoBuscarInputSearch('Rick');

    expect(component.scrollToTop).toHaveBeenCalled();
    expect(component.pagina).toBe(1);
    expect(component.filtroNome).toBe('Rick');
    expect(component.dadosTotalCarregado).toBeFalse();
    expect(component.carregarDados).toHaveBeenCalled();
  }));
});
