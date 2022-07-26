import { Component, OnInit } from '@angular/core';
import { Deportista } from 'src/app/model/entity/deportista';
import { Valoracion } from 'src/app/model/entity/valoracion';
import { UserDeportistaService } from 'src/app/service/user-deportista.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-user-valoraciones-compare',
  templateUrl: './user-valoraciones-compare.component.html',
  styleUrls: ['./user-valoraciones-compare.component.scss']
})
export class UserValoracionesCompareComponent implements OnInit {

  deportista: Deportista;
  valoracionesList: Valoracion[] = [];
  selectedFirst: number;
  selectedSecond: number;

  valoracionFirst: Valoracion;
  valoracionSecond: Valoracion;

  constructor(
    private authenticationService: AuthenticationService,
    private userDeportistaService: UserDeportistaService
  ) {
    this.valoracionFirst = new Valoracion();
    this.valoracionSecond = new Valoracion();
  }

  ngOnInit(): void {
    this.userDeportistaService.getDeportistaById(this.authenticationService.currentUser.id).subscribe(response => {
      this.deportista = response;
      this.loadData();
    }, error => {
      console.error("error", error);
    });
  }

  loadData() {
    this.userDeportistaService.getAllValoraciones(this.deportista.id)
      .subscribe(response => {
        this.valoracionesList = response;
        this.selectedFirst = this.valoracionesList[0].id;
        this.loadValoracion(this.selectedFirst);
        this.selectedSecond = this.valoracionesList[1].id;
        this.loadValoracion(this.selectedSecond, false);
      }, error => {
        console.error("error", error);
      });
  }

  get fechasFirst(): Valoracion[] {
    if (this.valoracionesList) {
      return this.valoracionesList.filter(valoracion => valoracion.id != this.selectedSecond)
    } else {
      return [];
    }
  }

  get fechasSecond(): Valoracion[] {
    if (this.valoracionesList) {
      return this.valoracionesList.filter(valoracion => valoracion.id != this.selectedFirst)
    } else {
      return [];
    }
  }

  loadValoracion(valoracionId: number, isFirst: boolean = true) {
    this.userDeportistaService.getValoracionById(valoracionId).subscribe(response => {
      if (isFirst) {
        this.valoracionFirst.medidas.setAllData(response.medidas, this.deportista.info.genero);
        this.valoracionFirst.tests.setAllData(response.tests, this.deportista.info.genero);
      } else {
        this.valoracionSecond.medidas.setAllData(response.medidas, this.deportista.info.genero);
        this.valoracionSecond.tests.setAllData(response.tests, this.deportista.info.genero);
      }
    }, error => {
      console.error("error", error);
    });
  }

}
