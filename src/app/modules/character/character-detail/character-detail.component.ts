import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumCharacterGenderId, EnumCharacterGenderLabel, EnumCharacterSpecieId, EnumCharacterSpecieLabel, EnumCharacterStatusId, EnumCharacterStatusLabel } from 'src/app/enums/character.enum';
import { CharacterModel } from 'src/app/models/character.model';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  id: number;

  dados: CharacterModel | null = null;

  loading = true;

  erroAoCarregarDados = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickMortyService: RickMortyService,
    private router: Router,
    private location: Location
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.loading = true;

    this.rickMortyService.getCharacter(this.id).subscribe((result) => {   
      this.loading = false;
      this.dados = result;
    });
  }

  fechar() {
    this.location.back();
  }

  obterLabelStatus(status: EnumCharacterStatusId | null) {

    if (status == null) return '';

    const statusLabelMapping: Record<EnumCharacterStatusId, string> = {
      [EnumCharacterStatusId.Alive]: EnumCharacterStatusLabel.Alive,
      [EnumCharacterStatusId.Dead]: EnumCharacterStatusLabel.Dead,
      [EnumCharacterStatusId.Unknown]: EnumCharacterStatusLabel.Unknown,
    };
  
    return statusLabelMapping[status] || ''; 
  }

  obterLabelGenero(genero: EnumCharacterGenderId | null) {

    if (genero == null) return '';

    const genderLabelMapping: Record<EnumCharacterGenderId, string> = {
      [EnumCharacterGenderId.Female]: EnumCharacterGenderLabel.Female,
      [EnumCharacterGenderId.Male]: EnumCharacterGenderLabel.Male,
      [EnumCharacterGenderId.Genderless]: EnumCharacterGenderLabel.Genderless,
      [EnumCharacterGenderId.Unknown]: EnumCharacterGenderLabel.Unknown,
    };
  
    return genderLabelMapping[genero] || genero; 
  }

  obterLabeleEspecie(specie: EnumCharacterSpecieId | null) {

    if (specie == null) return '';

    const specieLabelMapping: Record<EnumCharacterSpecieId, string> = {
      [EnumCharacterSpecieId.Alien]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Animal]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Cronenberg]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Disease]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Human]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Humanoid]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.MythologicalCreature]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Poopybutthole]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Robot]: EnumCharacterSpecieLabel.Alien,
      [EnumCharacterSpecieId.Unknown]: EnumCharacterSpecieLabel.Unknown
    };
  
    return specieLabelMapping[specie] || specie; 
  }

}
