/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputSearchComponent } from './input-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { InputSearchService } from './input-search.service';

describe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;
  let inputSearchService: InputSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSearchComponent ],
      imports: [
        TranslateModule.forRoot(),
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        InputSearchService
      ]
    })
    .compileComponents();

    inputSearchService = TestBed.inject(InputSearchService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o valor do formGroup ao alterar o nome no serviço nome$', () => {
    const mockNome = 'Nome de Teste';
    inputSearchService.setNome(mockNome);
    expect(component.formGroup.get('nome')?.value).toEqual(mockNome);
  });

  it('deve emitir o evento aoBuscar e chamar setNome ao buscar', () => {
    spyOn(component.aoBuscar, 'emit');
    const mockNome = 'Nome de Teste';
    component.formGroup.get('nome')?.setValue(mockNome);
    fixture.detectChanges();
    component.buscar();

    expect(component.aoBuscar.emit).toHaveBeenCalledWith(mockNome);
  });
});
