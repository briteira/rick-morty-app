import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickMortyResponseModel } from '../models/rick-morty-response.model';
import { CharacterModel } from '../models/character.model';
import { EpisodeModel } from '../models/episode.model';
import { LocationModel } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})

export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  getCharacters(pagina?: number, nome?: string, status?: string, genero?: string): Observable<RickMortyResponseModel<CharacterModel>> {
    pagina = pagina ?? 1;
    
    let url = `${this.apiUrl}character?page=${pagina}`;

    if (nome && nome.trim() != "") url += `&name=${nome}`;

    if (status && status.trim() != "") url += `&status=${status}`;

    if (genero && genero.trim() != "") url += `&gender=${genero}`;

    return this.http.get<RickMortyResponseModel<CharacterModel>>(url);
  }

  getCharacter(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.apiUrl}character/${id}`);
  }

  getCharacterById(ids: number[]): Observable<CharacterModel[]> {
    return this.http.get<CharacterModel[]>(`${this.apiUrl}character/[${ids.join(',')}]`);
  }

  getEpisodes(pagina?: number, nome?: string, episodio?: string): Observable<RickMortyResponseModel<EpisodeModel>> {
    pagina = pagina ?? 1;
    
    let url = `${this.apiUrl}episode?page=${pagina}`;

    if (nome && nome.trim() != "") url += `&name=${nome}`;

    if (episodio && episodio.trim() != "") url += `&episode=${episodio}`;

    return this.http.get<RickMortyResponseModel<EpisodeModel>>(url);
  }

  getEpisode(id: number): Observable<EpisodeModel> {
    return this.http.get<EpisodeModel>(`${this.apiUrl}episode/${id}`);
  }

  getEpisodesById(ids: number[]): Observable<EpisodeModel[]> {
    return this.http.get<EpisodeModel[]>(`${this.apiUrl}episode/[${ids.join(',')}]`);
  }

  getLocations(pagina?: number, nome?: string, tipo?: string, dimensao?: string): Observable<RickMortyResponseModel<LocationModel>> {
    pagina = pagina ?? 1;
    
    let url = `${this.apiUrl}location?page=${pagina}`;

    if (nome && nome.trim() != "") url += `&name=${nome}`;

    if (tipo && tipo.trim() != "") url += `&type=${tipo}`;

    if (dimensao && dimensao.trim() != "") url += `&dimension=${dimensao}`;

    return this.http.get<RickMortyResponseModel<LocationModel>>(url);
  }

  getLocation(id: number): Observable<LocationModel> {
    return this.http.get<LocationModel>(`${this.apiUrl}location/${id}`);
  }

  getLocationById(ids: number[]): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(`${this.apiUrl}location/[${ids.join(',')}]`);
  }
}
