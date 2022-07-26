import { Component, OnInit } from '@angular/core';
import { ValoracionesService } from 'src/app/service/valoraciones.service';
import { Deportista } from 'src/app/model/entity/deportista';
import { Valoracion } from 'src/app/model/entity/valoracion';

@Component({
  selector: 'app-admin-valoraciones-compare',
  templateUrl: './admin-valoraciones-compare.component.html',
  styleUrls: ['./admin-valoraciones-compare.component.scss']
})
export class AdminValoracionesCompareComponent implements OnInit {

  deportista: Deportista;
  valoracionesList: Valoracion[] = [];
  selectedFirst: number;
  selectedSecond: number;

  valoracionFirst: Valoracion;
  valoracionSecond: Valoracion;

  constructor(
    private valoracionesService: ValoracionesService
  ) {
    this.deportista = this.valoracionesService.currentDeportistaValoraciones;
    this.valoracionFirst = new Valoracion();
    this.valoracionSecond = new Valoracion();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.valoracionesService.getAll(this.deportista.id)
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
    this.valoracionesService.getById(valoracionId).subscribe(response => {
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
