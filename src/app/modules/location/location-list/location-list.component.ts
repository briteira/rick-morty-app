import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { InputSearchService } from 'src/app/components/input-search/input-search.service';
import { LocationModel } from 'src/app/models/location.model';
import { RickMortyService } from 'src/app/services/rick-morty.service';
import { LocationFilterModalComponent } from '../location-filter-modal/location-filter-modal.component';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit, AfterViewInit {

  @ViewChild('divTabela', { static: true }) divTabela: ElementRef | undefined;

  private subscription: Subscription | undefined;

  dados: LocationModel[] = [];

  pagina = 1;

  filtroNome?: string | undefined;
  filtroTipo?: string | undefined;
  filtroDimensao?: string | undefined;

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

    this.rickMortyService.getLocations(this.pagina, this.filtroNome, this.filtroTipo, this.filtroDimensao).subscribe((result) => {   
      this.loading = false;

      this.dados = [...this.dados, ...result.results];
      this.ajustarAlturaTabela();
      
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
    const folga = '16px';
    this.renderer.setStyle(this.divTabela?.nativeElement, 'height', `calc(100vh - ${heightHeader} - ${paddingRouterElement} - ${header?.clientHeight}px - ${folga})`);
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

  abrirModalFiltros() {
    const initialState: ModalOptions = {
      initialState: {
        nome: this.filtroNome,
        tipo: this.filtroTipo,
        dimensao: this.filtroDimensao
      },
      class: 'modal-lg'
    };
    this.bsModalRef = this.modalService.show(LocationFilterModalComponent, initialState);

    this.bsModalRef.content.aoAplicar.subscribe((form: FormGroup) => {
      this.inputSearchService.setNome(form.get('nome')?.value);
      this.filtroNome = form.get('nome')?.value;
      this.filtroTipo = form.get('tipo')?.value;
      this.filtroDimensao = form.get('dimensao')?.value;

      this.scrollToTop();

      this.pagina = 1;
      this.dadosTotalCarregado = false;

      this.carregarDados();
    });
  }

  abrirDetalhe(id: number) {
    this.router.navigate(['/locations/detail', id]);
  }

}
