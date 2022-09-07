import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { IconDefinition, faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { JwtRequest } from 'src/app/model/request/jwt-request';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser: IconDefinition = faUser;
  faLock: IconDefinition = faLock;
  faSignInAlt: IconDefinition = faSignInAlt;

  loginForm: FormGroup;
  submitted: boolean = false;
  isLogginFailed: boolean = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUser) {
      const role = this.authenticationService.currentUser.role
      switch (role) {
        case TipoUsuario.SUPER.abreviatura:
        case TipoUsuario.ADMINISTRADOR.abreviatura:
          this.router.navigate(['/admin/dashboard']);
          break;
        case TipoUsuario.USUARIO.abreviatura:
          this.router.navigate(['/user/dashboard']);
          break;
      }
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
  }

  get f() { return this.loginForm.controls; }

  doAuthentication() {
    setTimeout(() => {
      const username = this.f.username.value;
      const password = this.f.password.value;
      this.authenticationService.authenticate(new JwtRequest(username, password))
        .subscribe({next: ((response) => {
          this.isLogginFailed = !response;
          if (response) {
            this.router.navigate([this.returnUrl]);
          }
        }), error: ((error) => {
          console.error("error", error);
          this.isLogginFailed = true;
        })});
    }, 500);

  }

}
