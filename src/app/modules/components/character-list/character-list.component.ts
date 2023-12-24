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

  pagina = 1;

  dadosTotalCarregado = false;

  constructor(
    private rickMortyService: RickMortyService,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.ajustarAlturaTabela();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if (this.dadosTotalCarregado) return;

    this.rickMortyService.getCharacters(this.pagina).subscribe((result) => {
      this.dados = [...this.dados, ...result.results];
      this.pagina++;
      if (this.pagina <= result.info.pages) {
        if (this.pagina == 2) {
          this.carregarDados();
        }
      } else {
        this.dadosTotalCarregado = true;
      }
    })
  }

  ajustarAlturaTabela() {
    const header = document.querySelector(".header");
    const heightHeader = '70px';
    const paddingRouterElement = '24px';
    this.renderer.setStyle(this.divTabela?.nativeElement, 'height', `calc(100vh - ${heightHeader} - ${paddingRouterElement} - ${header?.clientHeight}px)`);
  }

  onScrollTable() {
    const container = this.divTabela?.nativeElement;
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

    if (isAtBottom) {
      this.carregarDados();
    }
  }

}
