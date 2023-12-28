import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-loccation-filter-modal',
  templateUrl: './location-filter-modal.component.html',
  styleUrls: ['./location-filter-modal.component.css']
})
export class LocationFilterModalComponent implements OnInit {

  formGroup: FormGroup;

  @Output() aoAplicar: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private options: ModalOptions
  ) {

    this.formGroup = this.formBuilder.group({
      nome: [this.options?.initialState?.['nome'] || '', []],
      tipo: [this.options?.initialState?.['tipo'] || '', []],
      dimensao: [this.options?.initialState?.['dimensao'] || '', []]
    });
  }
 
  ngOnInit() {
    
  }

  aplicar() {
    this.aoAplicar.emit(this.formGroup);
    this.bsModalRef.hide();
  }

}
