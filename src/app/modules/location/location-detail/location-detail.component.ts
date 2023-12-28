import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { Location } from '@angular/common';
import { EpisodeModel } from 'src/app/models/episode.model';
import { LocationModel } from 'src/app/models/location.model';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  id: number;

  dados: LocationModel | null = null;

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

    this.rickMortyService.getLocation(this.id).subscribe((result) => {   
      
      this.dados = result;
      this.loading = false;
    });
  }

  fechar() {
    this.location.back();
  }

}
