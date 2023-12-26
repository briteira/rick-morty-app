import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {

  @Output() aoBuscar: EventEmitter<string> = new EventEmitter<string>();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.formGroup = this.formBuilder.group({
      nome: ['', []]
    });
  }

  ngOnInit() {
  }

  buscar() {
    this.aoBuscar.emit(this.formGroup.get('nome')?.value);
  }

}
