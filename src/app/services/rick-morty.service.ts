import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickMortyResponseModel } from '../models/rick-morty-response.model';
import { CharacterModel } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})

export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  getCharacters(pagina?: number, nome?: string, status?: string, genero?: string): Observable<RickMortyResponseModel> {
    pagina = pagina ?? 1;
    
    let url = `${this.apiUrl}character?page=${pagina}`;

    if (nome && nome.trim() != "") url += `&name=${nome}`;

    if (status && status.trim() != "") url += `&status=${status}`;

    if (genero && genero.trim() != "") url += `&gender=${genero}`;

    return this.http.get<RickMortyResponseModel>(url);
  }

  getCharacter(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.apiUrl}character/${id}`);
  }

  getEpisodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}episode`);
  }
}
