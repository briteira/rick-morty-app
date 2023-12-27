import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeModel } from 'src/app/models/episode.model';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {

  id: number;

  dados: EpisodeModel | null = null;

  loading = true;

  erroAoCarregarDados = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickMortyService: RickMortyService,
    private location: Location
  ) { 
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.loading = true;

    this.rickMortyService.getEpisode(this.id).subscribe((result) => {   
      this.loading = false;
      this.dados = result;
    });
  }

  fechar() {
    this.location.back();
  }

}
