import { Component, OnInit } from '@angular/core';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';
import { AbrevEnum } from 'src/app/model/enums/abrev-enum';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
