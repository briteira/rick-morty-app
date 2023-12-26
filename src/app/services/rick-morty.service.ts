import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickMortyResponseModel } from '../models/rick-morty-response.model';

@Injectable({
  providedIn: 'root',
})

export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) {}

  getCharacters(pagina?: number, nome?: string): Observable<RickMortyResponseModel> {
    pagina = pagina ?? 1;
    let url = `${this.apiUrl}character?page=${pagina}`;

    if (nome && nome.trim() != "") url += `&name=${nome}`;

    return this.http.get<RickMortyResponseModel>(url);
  }

  getEpisodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}episode`);
  }
}
