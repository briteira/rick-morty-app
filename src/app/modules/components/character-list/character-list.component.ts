import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EnumCharacterGenderId, EnumCharacterGenderLabel, EnumCharacterStatusId, EnumCharacterStatusLabel } from 'src/app/enums/character.enum';
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
  filtroNome?: string | undefined;

  dadosTotalCarregado = false;

  loading = true;

  constructor(
    private rickMortyService: RickMortyService,
    private renderer: Renderer2,
  ) { }

  ngAfterViewInit(): void {
    this.ajustarAlturaTabela();
  }

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    if (this.dadosTotalCarregado) return;

    this.loading = true;

    if (this.pagina == 1) {
      this.dados = [];
    }

    this.rickMortyService.getCharacters(this.pagina, this.filtroNome).subscribe((result) => {      
      this.dados = [...this.dados, ...result.results];
      this.pagina++;
      if (this.pagina <= result.info.pages) {
        if (this.pagina == 2) {
          return this.carregarDados();
        }
      } else {
        this.dadosTotalCarregado = true;
      }

      this.loading = false;
    }, (error) => {
      this.dados = [];
      this.loading = false;
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
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;

    if (isAtBottom) {
      if (!this.loading) {
        this.loading = true;
        this.carregarDados();  
      }
      
    }
  }

  obterLabelStatus(status: EnumCharacterStatusId) {
    const statusLabelMapping: Record<EnumCharacterStatusId, string> = {
      [EnumCharacterStatusId.Alive]: EnumCharacterStatusLabel.Alive,
      [EnumCharacterStatusId.Dead]: EnumCharacterStatusLabel.Dead,
      [EnumCharacterStatusId.Unknown]: EnumCharacterStatusLabel.Unknown,
    };
  
    return statusLabelMapping[status] || ''; 
  }

  obterLabelGenero(status: EnumCharacterGenderId) {
    const statusLabelMapping: Record<EnumCharacterGenderId, string> = {
      [EnumCharacterGenderId.Female]: EnumCharacterGenderLabel.Female,
      [EnumCharacterGenderId.Male]: EnumCharacterGenderLabel.Male,
      [EnumCharacterGenderId.Genderless]: EnumCharacterGenderLabel.Male,
      [EnumCharacterGenderId.Unknown]: EnumCharacterGenderLabel.Male,
    };
  
    return statusLabelMapping[status] || ''; 
  }

  aoBuscarInputSearch($event: string) {
    this.scrollToTop();

    this.pagina = 1;
    this.filtroNome = $event;
    this.dadosTotalCarregado = false;

    this.carregarDados();
  }

  scrollToTop() {
    this.divTabela?.nativeElement.scrollTo({
      top: 0,
    });
  }

}
