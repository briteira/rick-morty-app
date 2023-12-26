import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InputSearchService {
  private nomeSubject = new BehaviorSubject<string>('');

  get nome$() {
    return this.nomeSubject.asObservable();
  }

  setNome(nome: string) {
    this.nomeSubject.next(nome);
  }
}