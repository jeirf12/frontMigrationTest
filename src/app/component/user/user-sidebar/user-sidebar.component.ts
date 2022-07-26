import { Component, OnInit } from '@angular/core';
import { IconDefinition, faHome, faClipboardCheck, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { Router } from '@angular/router';
import { RouteInfo } from 'src/app/model/route-info';
import { EnumsService } from 'src/app/service/enums.service';
import { Enums } from 'src/app/model/Enums';
import { JwtResponse } from 'src/app/model/response/jwt-response';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';

declare const $: any;

export const USER_ROUTES: RouteInfo[] = [
  { path: '/user/dashboard', title: 'Inicio', icon: faHome, show: true, extraCondition: false },
  { path: '/user/dashboard/valoraciones/compare', title: 'Comparar valoraciones', icon: faHome, show: false, extraCondition: false },
  { path: '/user/profile', title: 'Perfil', icon: faUser, show: false, extraCondition: false },
  { path: '/user/asistencia', title: 'Asistencia', icon: faClipboardCheck, show: true, extraCondition: false }

  /*{ path: '/user/instructores', title: 'Instructores', icon: faUsers, show: true, extraCondition: true },
  { path: '/user/instructores/save', title: 'Guardar Instructor', icon: faUsers, show: false, extraCondition: false } */
];

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html'
})
export class UserSidebarComponent implements OnInit {

  faUser: IconDefinition = faUser;
  faSignOutAlt: IconDefinition = faSignOutAlt;

  userLogged: JwtResponse;
  completeName: string;
  role: string = "";
  menuItems: RouteInfo[];

  constructor(
    private router: Router,
    private enumsService: EnumsService,
    private authenticationService: AuthenticationService
  ) {
    this.userLogged = this.authenticationService.currentUser;
    this.completeName = this.userLogged.primerNombre + ' ' + this.userLogged.primerApellido;
    this.role = this.enumsService.enumDescription(this.userLogged.role, Enums.tiposUsuario)
  }

  ngOnInit() {
    this.menuItems = USER_ROUTES.filter(menuItem => menuItem.show &&
      (menuItem.extraCondition ? this.userLogged.role == TipoUsuario.SUPER.abreviatura : true));
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  doLogout() {
    this.authenticationService.logout();
  }

}
