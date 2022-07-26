import { Component, OnInit } from '@angular/core';
import { IconDefinition, faHome, faUsers, faRunning, faCalendarCheck, faBoxes, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { Router } from '@angular/router';
import { RouteInfo } from 'src/app/model/route-info';
import { EnumsService } from 'src/app/service/enums.service';
import { Enums } from 'src/app/model/Enums';
import { JwtResponse } from 'src/app/model/response/jwt-response';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';

declare const $: any;

export const ADMIN_ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Inicio', icon: faHome, show: true, extraCondition: false },
  { path: '/admin/profile', title: 'Perfil', icon: faUser, show: false, extraCondition: false },

  { path: '/admin/instructores', title: 'Instructores', icon: faUsers, show: true, extraCondition: true },
  { path: '/admin/instructores/save', title: 'Guardar Instructor', icon: faUsers, show: false, extraCondition: false },

  { path: '/admin/deportistas', title: 'Usuarios', icon: faRunning, show: true, extraCondition: false },
  { path: '/admin/deportistas/save', title: 'Guardar Usuario', icon: faRunning, show: false, extraCondition: false },

  { path: '/admin/deportistas/valoraciones', title: 'Valoraciones', icon: faUsers, show: false, extraCondition: false },
  { path: '/admin/deportistas/valoraciones/save', title: 'Guardar Valoracion', icon: faUsers, show: false, extraCondition: false },
  { path: '/admin/deportistas/valoraciones/compare', title: 'Comparar Valoraciones', icon: faUsers, show: false, extraCondition: false },

  { path: '/admin/asistencia', title: 'Asistencia', icon: faCalendarCheck, show: true, extraCondition: false },
  { path: '/admin/asistencia/inscripcion', title: 'Inscripcion mensual de usuarios', icon: faCalendarCheck, show: false, extraCondition: false },
  { path: '/admin/asistencia/registro', title: 'Registro de asistencia', icon: faCalendarCheck, show: false, extraCondition: false },
  { path: '/admin/asistencia/reportes', title: 'Reportes de asistencia', icon: faCalendarCheck, show: false, extraCondition: false },
  { path: '/admin/asistencia/exportar', title: 'Exportar reportes', icon: faCalendarCheck, show: false, extraCondition: false },

  { path: '/admin/recursos', title: 'Recursos', icon: faBoxes, show: true, extraCondition: false },

  { path: '/admin/recursos/eventos', title: 'Eventos', icon: faBoxes, show: false, extraCondition: false },
  { path: '/admin/recursos/eventos/save', title: 'Guardar Evento', icon: faBoxes, show: false, extraCondition: false },

  { path: '/admin/recursos/noticias', title: 'Noticias', icon: faBoxes, show: false, extraCondition: false },
  { path: '/admin/recursos/noticias/save', title: 'Guardar Noticia', icon: faBoxes, show: false, extraCondition: false },

  { path: '/admin/recursos/grupos', title: 'Grupos', icon: faBoxes, show: false, extraCondition: false },
  { path: '/admin/recursos/grupos/save', title: 'Guardar Grupo', icon: faBoxes, show: false, extraCondition: false },

];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent implements OnInit {

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
    this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem.show &&
      (menuItem.extraCondition ? this.userLogged.role == TipoUsuario.SUPER.abreviatura : true));
  }

}

