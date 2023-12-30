import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  modalRef?: BsModalRef;
  isUserAuthenticated: boolean = false;

  private authSubscription: Subscription;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private modalService: BsModalService,
    private router: Router
  ) { 
    this.authSubscription = this.authService.authChange$.subscribe((isAuthenticated) => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  openModalLogout(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
 
  confirm(): void {
    this.modalRef?.hide();
    this.authService.setAuthenticated(false);
    this.router.navigate(['/login']);
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
