import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtRequest } from '../model/request/jwt-request';
import { JwtResponse } from '../model/response/jwt-response';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiResponse } from '../model/response/api-response';
import { TipoUsuario } from '../model/enums/tipo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.baseUrl + "auth/";
  private currentUserSubject: BehaviorSubject<JwtResponse>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('currentUser')));
  }

  set currentUser(usuario: JwtResponse) {
    localStorage.setItem('currentUser', JSON.stringify(usuario));
    this.currentUserSubject.next(usuario);
  }

  get currentUser(): JwtResponse {
    return this.currentUserSubject.value;
  }

  authenticate(request: JwtRequest): Observable<Boolean> {
    return this.http.post<ApiResponse<JwtResponse>>(this.baseUrl + "authenticate", request)
      .pipe(
        map(response => {
          if (response.success) {
            const user = response.body;
            if (user && user.token) {
              this.currentUser = user;
            }
            return true;
          } else {
            return false;
          }
        })
      );
  }

  isUserLoggedIn() {
    let token = localStorage.getItem('token');
    return !(token === null)
  }

  logout() {
    this.logoutWithoutNav();
    this.router.navigate(['/home']);
  }

  logoutWithoutNav() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  goToProfile() {
    if (this.currentUser.role == TipoUsuario.USUARIO.abreviatura) {
      this.router.navigate(['/user/profile']);
    } else {
      this.router.navigate(['/admin/profile']);
    }
  }

}
