import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputSearchService } from './input-search.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  @Output() aoBuscar: EventEmitter<string> = new EventEmitter<string>();

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private inputSearchService: InputSearchService
  ) { 
    this.formGroup = this.formBuilder.group({
      nome: ['', []]
    });
  }

  ngOnInit() {
    this.inputSearchService.nome$.subscribe(nome => {
      this.formGroup.get('nome')?.setValue(nome);
    });
  }

  buscar() {
    const nome = this.formGroup.get('nome')?.value;
    this.aoBuscar.emit(nome);
    this.inputSearchService.setNome(nome);
  }

}
