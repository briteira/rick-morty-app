import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { InputSearchService } from 'src/app/components/input-search/input-search.service';
import { EpisodeModel } from 'src/app/models/episode.model';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { EpisodeFilterModalComponent } from '../episode-filter-modal/episode-filter-modal.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css'],
})
export class EpisodeListComponent implements OnInit, AfterViewInit {

  @ViewChild('divTabela', { static: true }) divTabela: ElementRef | undefined;

  private subscription: Subscription | undefined;

  dados: EpisodeModel[] = [];

  pagina = 1;

  filtroNome?: string | undefined;
  filtroEpisodio?: string | undefined;

  dadosTotalCarregado = false;

  loading = true;

  erroAoCarregarDados = false;

  bsModalRef?: BsModalRef;

  constructor(
    private rickMortyService: RickMortyService,
    private renderer: Renderer2,
    private inputSearchService: InputSearchService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.ajustarAlturaTabela();
  }

  ngOnInit() {
    this.subscription = this.inputSearchService.nome$.subscribe(nome => {
      this.filtroNome = nome;
      this.carregarDados();
    });
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  carregarDados() {
    this.erroAoCarregarDados = false;

    if (this.dadosTotalCarregado) return;

    this.loading = true;

    if (this.pagina == 1) {
      this.dados = [];
    }

    this.rickMortyService.getEpisodes(this.pagina, this.filtroNome, this.filtroEpisodio).subscribe((result) => {   
      this.loading = false;

      this.dados = [...this.dados, ...result.results];
      
      this.pagina++;
      if (this.pagina <= result.info.pages) {
        if (this.pagina == 2) {
          return this.carregarDados();
        }
      } else {
        this.dadosTotalCarregado = true;
      }
    }, (error) => {
      this.loading = false;
      this.dados = [];
      if (error?.status != 404) {
        this.erroAoCarregarDados = true;
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
    const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight;

    if (isAtBottom) {
      if (!this.loading) {
        this.carregarDados();  
      }
      
    }
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.ajustarAlturaTabela();
  }

  abrirModalFiltros() {
    const initialState: ModalOptions = {
      initialState: {
        nome: this.filtroNome,
        episodio: this.filtroEpisodio,
      },
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(EpisodeFilterModalComponent, initialState);

    this.bsModalRef.content.aoAplicar.subscribe((form: FormGroup) => {
      this.inputSearchService.setNome(form.get('nome')?.value);
      this.filtroNome = form.get('nome')?.value;
      this.filtroEpisodio = form.get('episodio')?.value;

      this.scrollToTop();

      this.pagina = 1;
      this.dadosTotalCarregado = false;

      this.carregarDados();
    });
  }

  abrirDetalhe(id: number) {
    this.router.navigate(['/episodes/detail', id]);
  }

}
