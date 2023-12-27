import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { EnumCharacterGenderId, EnumCharacterGenderLabel, EnumCharacterStatusId, EnumCharacterStatusLabel } from 'src/app/enums/character.enum';

@Component({
  selector: 'app-character-filter-modal',
  templateUrl: './character-filter-modal.component.html',
  styleUrls: ['./character-filter-modal.component.css']
})
export class CharacterFilterModalComponent implements OnInit {

  listaStatus = [
    { value: EnumCharacterStatusId.Alive, descricao: EnumCharacterStatusLabel.Alive },
    { value: EnumCharacterStatusId.Dead, descricao: EnumCharacterStatusLabel.Dead },
    { value: EnumCharacterStatusId.Unknown, descricao: EnumCharacterStatusLabel.Unknown }
  ];

  listaGenero = [
    { value: EnumCharacterGenderId.Male, descricao: EnumCharacterGenderLabel.Male },
    { value: EnumCharacterGenderId.Female, descricao: EnumCharacterGenderLabel.Female },
    { value: EnumCharacterGenderId.Genderless, descricao: EnumCharacterGenderLabel.Genderless },
    { value: EnumCharacterGenderId.Unknown, descricao: EnumCharacterGenderLabel.Unknown },
  ]

  formGroup: FormGroup;

  @Output() aoAplicar: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private options: ModalOptions
  ) {

    this.formGroup = this.formBuilder.group({
      nome: [this.options?.initialState?.['nome'] || '', []],
      status: [this.options?.initialState?.['status'] || '', []],
      genero: [this.options?.initialState?.['genero'] || '', []]
    });
  }
 
  ngOnInit() {
    
  }

  aplicar() {
    this.aoAplicar.emit(this.formGroup);
    this.bsModalRef.hide();
  }

}
