import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { TipoUsuario } from '../model/enums/tipo-usuario';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUser;
        if (currentUser) {
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
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
                return false;
            }
            return true;
        }
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}