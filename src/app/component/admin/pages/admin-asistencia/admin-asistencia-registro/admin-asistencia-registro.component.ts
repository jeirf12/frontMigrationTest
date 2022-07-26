import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IconDefinition, faCalendar, faCheckSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { DialogsService } from 'src/app/service/dialogs.service';
import { DeportistasService } from 'src/app/service/deportistas.service';
import { Grupo } from 'src/app/model/entity/grupo';
import { GruposService } from 'src/app/service/grupos.service';
import { InscripcionesService } from 'src/app/service/inscripciones.service';
import { Deportista } from 'src/app/model/entity/deportista';
import { Horario } from 'src/app/model/entity/horario';
import { HorarioUtil } from 'src/app/util/horario-util';
import { NgbDatepickerI18n, NgbDatepickerConfig, NgbDateStruct, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { Asistencia } from 'src/app/model/entity/asistencia';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { DateUtil } from 'src/app/util/date-util';
import { TwoObjects } from 'src/app/model/two-objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-asistencia-registro',
  templateUrl: './admin-asistencia-registro.component.html',
  styleUrls: ['./admin-asistencia-registro.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminAsistenciaRegistroComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faCheckSquare: IconDefinition = faCheckSquare;
  faWindowClose: IconDefinition = faWindowClose;

  private deportistasList: Deportista[] = [];
  asistencia: Asistencia;
  gruposList: Grupo[] = [];
  grupoIndex: number;
  fechaAsistencia: NgbDateStruct;
  inscripcionExists: boolean = false;
  isCreate: boolean = true;

  constructor(
    private router: Router,
    private location: Location,
    private dialogsService: DialogsService,
    private asistenciaService: AsistenciaService,
    private datePickerConfig: NgbDatepickerConfig,
    private calendar: NgbCalendar,
    private deportistasService: DeportistasService,
    private gruposService: GruposService,
    private inscripcionesService: InscripcionesService
  ) {
    this.asistencia = new Asistencia();
    this.asistencia.inscripcion.deportistas = [];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.deportistasService.getAll().subscribe(response => {
      this.deportistasList = response;
    }, error => {
      console.error("error", error);
    });
    this.gruposService.getAll().subscribe(response => {
      this.gruposList = response;
      if (this.gruposList.length > 0) {
        this.grupoIndex = 0;
        this.onGrupoChange();
      }
    }, error => {
      console.error("error", error);
    });
  }

  save() {
    this.asistencia.fecha = DateUtil.structureToDate(this.fechaAsistencia);
    this.asistenciaService.save(this.asistencia, this.isCreate).subscribe(response => {
      if (response.success) {
        this.dialogsService.showToast(response.body, true);
        this.back();
      } else {
        this.dialogsService.showToast(response.body, false);
      }
    }, error => {
      console.error("error", error);
    });
  }

  back() {
    this.location.back();
  }

  get deportistas(): Deportista[] {
    if (this.deportistasList) {
      return this.deportistasList.filter(deportista => this.asistencia.inscripcion.deportistas.includes(deportista.id.toString()));
    } else {
      return [];
    }
  }

  loadInscripcion() {
    this.inscripcionesService.getInscripcion(this.asistencia.inscripcion.mes,
      this.asistencia.inscripcion.anio, this.gruposList[this.grupoIndex].id).subscribe(response => {
        if (response) {
          this.asistencia.inscripcion = response;
          this.inscripcionExists = true;
          const request = new TwoObjects<Date, number>();
          request.first = DateUtil.structureToDate(this.fechaAsistencia);
          request.second = this.asistencia.inscripcion.id;
          this.asistenciaService.getAsistencia(request).subscribe(response => {
            if (response) {
              this.asistencia = response;
              this.isCreate = false;
            } else {
              this.asistencia.asistieron = [];
              this.asistencia.observaciones = null;
              this.isCreate = true;
            }
          }, error => {
            console.error("error", error);
          });
        } else {
          this.asistencia.inscripcion.deportistas = [];
          this.inscripcionExists = false;
        }
      }, error => {
        console.error("error", error);
      });
  }

  onGrupoChange() {
    const grupo = this.gruposList[this.grupoIndex];
    const enabledDays: number[] = [];
    grupo.horariosList.forEach(horario => {
      enabledDays.push(horario.dia);
    });
    this.datePickerConfig.maxDate = DateUtil.dateToStructure(new Date());
    this.datePickerConfig.markDisabled = (date: NgbDate) => !enabledDays.includes(this.calendar.getWeekday(date));
    this.fechaAsistencia = null;
    this.asistencia.inscripcion.deportistas = [];
    this.inscripcionExists = false;
    this.asistencia.observaciones = null;
  }

  onDateChange() {
    this.asistencia.inscripcion.mes = this.fechaAsistencia.month;
    this.asistencia.inscripcion.anio = this.fechaAsistencia.year;
    this.loadInscripcion();
  }

  getHorarioCompleto(horario: Horario): string {
    return HorarioUtil.getHorarioCompleto(horario);
  }

  getAsistencia(id: number): boolean {
    return this.asistencia.asistieron.includes(id.toString());
  }

  changeAsistencia(id: number, asistencia: boolean) {
    if (asistencia) {
      this.asistencia.asistieron.push(id.toString());
    } else {
      const index = this.asistencia.asistieron.indexOf(id.toString());
      this.asistencia.asistieron.splice(index, 1);
    }
  }

  changeAsistenciaToAll() {
    if (this.asistencia.asistieron.length == this.asistencia.inscripcion.deportistas.length) {
      this.asistencia.asistieron = [];
    } else {
      this.asistencia.asistieron = this.asistencia.inscripcion.deportistas;
    }
  }

  goToGrupos() {
    this.router.navigate(['admin/recursos/grupos']);
  }

}
