import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { faUserEdit, faUserCheck, faChartPie, faFileExcel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-asistencia',
  templateUrl: './admin-asistencia.component.html',
  styleUrls: ['./admin-asistencia.component.scss']
})
export class AdminAsistenciaComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
  ) {
    this.buildMenu();
  }

  ngOnInit(): void {
  }

  buildMenu() {
    this.menuItems.push(new MenuItem(1, faUserEdit, "Inscripcion de usuarios"));
    this.menuItems.push(new MenuItem(2, faUserCheck, "Registro de asistencia"));
    this.menuItems.push(new MenuItem(3, faChartPie, "Reportes de asistencia"));
    this.menuItems.push(new MenuItem(4, faFileExcel, "Exportar reportes"));
  }

  navigate(id: number) {
    var path = '/admin/asistencia/';
    switch (Number(id)) {
      case 1:
        path += 'inscripcion';
        break;
      case 2:
        path += 'registro';
        break;
      case 3:
        path += 'reportes';
        break;
      case 4:
        path += 'exportar';
        break;
    }
    this.router.navigate([path]);
  }

}
