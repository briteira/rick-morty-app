import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-episode-filter-modal',
  templateUrl: './episode-filter-modal.component.html',
  styleUrls: ['./episode-filter-modal.component.css']
})
export class EpisodeFilterModalComponent implements OnInit {

  formGroup: FormGroup;

  @Output() aoAplicar: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private options: ModalOptions
  ) {

    this.formGroup = this.formBuilder.group({
      nome: [this.options?.initialState?.['nome'] || '', []],
      episodio: [this.options?.initialState?.['episodio'] || '', []],
    });
  }
 
  ngOnInit() {
    
  }

  aplicar() {
    this.aoAplicar.emit(this.formGroup);
    this.bsModalRef.hide();
  }

}
