import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CharacterModel } from 'src/app/models/character.model';
import { RickMortyService } from 'src/app/services/rick-morty.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, AfterViewInit {

  @ViewChild('divTabela', { static: true }) divTabela: ElementRef | undefined;

  dados: CharacterModel[] = [];

  constructor(
    private rickMortyService: RickMortyService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.ajustarAlturasTabela();
  }

  ngOnInit() {

    this.rickMortyService.getCharacters().subscribe((result) => {
      this.dados = [...result.results];
      console.log(this.dados);
    })

  }

  ajustarAlturasTabela() {
    const header = document.querySelector(".header");
    const heightHeader = '70px';
    const paddingRouterElement = '24px';
    this.renderer.setStyle(this.divTabela?.nativeElement, 'height', `calc(100vh - ${heightHeader} - ${paddingRouterElement} - ${header?.clientHeight}px)`);
  }

}
