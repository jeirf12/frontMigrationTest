import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/model/menu-item';
import { faCalendarDay, faNewspaper, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-recursos',
  templateUrl: './admin-recursos.component.html',
  styleUrls: ['./admin-recursos.component.scss']
})
export class AdminRecursosComponent implements OnInit {

  menuItems: MenuItem[] = [];

  constructor(
    private router: Router,
  ) {
    this.buildMenu();
  }

  ngOnInit(): void {
  }

  buildMenu() {
    this.menuItems.push(new MenuItem(1, faCalendarDay, "Eventos"));
    this.menuItems.push(new MenuItem(2, faNewspaper, "Noticias"));
    this.menuItems.push(new MenuItem(3, faTable, "Grupos"));
  }

  navigate(id: number) {
    var path = '/admin/recursos/';
    switch (Number(id)) {
      case 1:
        path += 'eventos';
        break;
      case 2:
        path += 'noticias';
        break;
      case 3:
        path += 'grupos';
        break;
    }
    this.router.navigate([path]);
  }

}
