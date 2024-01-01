import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, delay, of } from 'rxjs';
import { usersMock } from 'src/app/mocks/users.mock';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users = usersMock;

  isUserAuthenticated: boolean = false;

  private authSubscription: Subscription;

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) { 
    this.formGroup = this.formBuilder.group({
      email: ['', []],
      senha: ['', []]
    });

    this.authSubscription = this.authService.authChange$.subscribe((user) => {
      this.isUserAuthenticated = (user && user != null);
      if (this.isUserAuthenticated) {
        this.router.navigate(['/characters/']);
      }
    });
  }
  ngOnInit(): void {}


  login(): void {
    const email = this.formGroup.get('email')?.value;
    const senha = this.formGroup.get('senha')?.value;

    if (email.trim() == '') {
      this.toastrService.error(this.translateService.instant('login.emailObrigatorio'), "", {
        positionClass: 'toast-bottom-right' 
      });
    } else if (senha.trim() == '') {
      this.toastrService.error(this.translateService.instant('login.senhaObrigatorio'), "", {
        positionClass: 'toast-bottom-right' 
      });
    } else {

      const user = this.users.find(u => u.email === email && u.password === senha);

      if (user) {
        this.authService.login(user);
        this.router.navigate(['/characters/']);
      } else {
        this.toastrService.error(this.translateService.instant('login.emailOuSenhaIncorretos'), "", {
          positionClass: 'toast-bottom-right' 
        });
      }
    }
  }

}
