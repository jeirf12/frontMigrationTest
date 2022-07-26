import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IconDefinition, faSearch, faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { Deportista } from 'src/app/model/entity/deportista';
import { DialogsService } from 'src/app/service/dialogs.service';
import { DeportistasService } from 'src/app/service/deportistas.service';
import { TwoObjects } from 'src/app/model/two-objects';
import { DateUtil } from 'src/app/util/date-util';
import { Grupo } from 'src/app/model/entity/grupo';
import { GruposService } from 'src/app/service/grupos.service';
import { Horario } from 'src/app/model/entity/horario';
import { HorarioUtil } from 'src/app/util/horario-util';
import { InscripcionesService } from 'src/app/service/inscripciones.service';
import { Inscripcion } from 'src/app/model/entity/inscripcion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-asistencia-inscripcion',
  templateUrl: './admin-asistencia-inscripcion.component.html',
  styleUrls: ['./admin-asistencia-inscripcion.component.scss']
})
export class AdminAsistenciaInscripcionComponent implements OnInit {

  faSearch: IconDefinition = faSearch;
  faUserPlus: IconDefinition = faUserPlus;
  faUserMinus: IconDefinition = faUserMinus;

  inscripcion: Inscripcion;
  gruposList: Grupo[] = [];
  grupoIndex: number;
  isCreate: boolean = true;

  private deportistasList: Deportista[] = [];
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0;
  searchKey: string = "";

  deportistasSelectedList: Deportista[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private dialogsService: DialogsService,
    private deportistasService: DeportistasService,
    private gruposService: GruposService,
    private inscripcionesService: InscripcionesService
  ) {
    const date = DateUtil.dateToStructure(new Date());
    this.inscripcion = new Inscripcion();
    this.inscripcion.mes = date.month;
    this.inscripcion.anio = date.year;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.deportistasService.getAll().subscribe(response => {
      this.deportistasList = response;
      this.collectionSize = this.deportistasList.length;
    }, error => {
      console.error("error", error);
    });
    this.gruposService.getAll().subscribe(response => {
      this.gruposList = response;
      if (this.gruposList.length > 0) {
        this.grupoIndex = 0;
        this.loadInscripcion();
      }
    }, error => {
      console.error("error", error);
    });
  }

  loadInscripcion() {
    this.inscripcionesService.getInscripcion(this.inscripcion.mes, this.inscripcion.anio, this.gruposList[this.grupoIndex].id).subscribe(response => {
      this.deportistasSelectedList = [];
      if (response) {
        this.inscripcion = response;
        this.deportistasSelectedList = this.deportistasList.filter(deportista => response.deportistas.includes(deportista.id.toString()));
        this.isCreate = false;
      } else {
        this.isCreate = true;
      }
    }, error => {
      console.error("error", error);
    });
  }

  save() {
    if (this.deportistasSelectedList.length > 0) {
      this.inscripcion.grupo = this.gruposList[this.grupoIndex];
      this.inscripcion.deportistas = [];
      this.deportistasSelectedList.forEach(deportista => {
        this.inscripcion.deportistas.push(deportista.id.toString());
      });
      this.inscripcionesService.save(this.inscripcion, this.isCreate).subscribe(response => {
        if (response.success) {
          this.dialogsService.showToast(response.body, true);
          this.back();
        } else {
          this.dialogsService.showToast(response.body, false);
        }
      }, error => {
        console.error("error", error);
      });
    } else {
      this.dialogsService.showToast("debe agregar deportistas para hacer la inscripción", false);
    }
  }

  back() {
    this.location.back();
  }

  get deportistas(): Deportista[] {
    if (this.deportistasList) {
      return this.deportistasList
        .filter(user => (user.info.documento.toString().toLowerCase().includes(this.searchKey.toLowerCase()) ||
          (user.info.primerNombre + ' ' + user.info.primerApellido).toLowerCase().includes(this.searchKey.toLowerCase())) &&
          (this.deportistasSelectedList.indexOf(user) < 0)
        )
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    } else {
      return [];
    }
  }

  inscribir(deportista: Deportista) {
    this.deportistasSelectedList.unshift(deportista);
    this.searchKey = "";
  }

  cancelarInscripcion(index: number) {
    this.deportistasSelectedList.splice(index, 1);
  }

  showMonthPicker() {
    this.dialogsService.showMonthPicker(this.inscripcion.mes, this.inscripcion.anio).subscribe((response: TwoObjects<number, number>) => {
      this.inscripcion.anio = response.first;
      this.inscripcion.mes = response.second;
      this.loadInscripcion();
    });
  }

  getMonthYear(): string {
    return DateUtil.getMonthFullName(this.inscripcion.mes) + " - " + this.inscripcion.anio;
  }

  getHorarioCompleto(horario: Horario): string {
    return HorarioUtil.getHorarioCompleto(horario);
  }

  goToGrupos() {
    this.router.navigate(['admin/recursos/grupos']);
  }

}
