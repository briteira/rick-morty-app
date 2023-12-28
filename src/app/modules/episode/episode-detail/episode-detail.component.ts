import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeModel } from 'src/app/models/episode.model';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { Location } from '@angular/common';
import { CharacterModel } from 'src/app/models/character.model';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {

  id: number;

  dados: EpisodeModel | null = null;

  listaPersonagens: CharacterModel[] = [];

  loading = true;

  erroAoCarregarDados = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickMortyService: RickMortyService,
    private location: Location,
    private router: Router
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.loading = true;

    this.rickMortyService.getEpisode(this.id).subscribe((result) => {   
      
      this.dados = result;

      var idsPersonagens = this.obterIdsPersonagens(result.characters);
      this.rickMortyService.getCharacterById(idsPersonagens).subscribe((personagens) => { 
        this.listaPersonagens = personagens;
        this.loading = false;
      });
    });
  }

  fechar() {
    this.location.back();
  }

  obterIdsPersonagens(lista: string[]) {
    const urlApi = 'https://rickandmortyapi.com/api/character/';
    return lista.map((i) => parseInt(i.replace(urlApi, "")));
  }
    
  abrirDetalhePersonagem(id: number) {
    this.router.navigate(['/characters/detail/', id]);
  }

}
