import { Component, OnInit } from '@angular/core';
import { IconDefinition, faCalendar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Grupo } from 'src/app/model/entity/grupo';
import { Location } from '@angular/common';
import { NgbDatepickerI18n, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { InstructoresService } from 'src/app/service/instructores.service';
import { Usuario } from 'src/app/model/entity/usuario';
import { DialogsService } from 'src/app/service/dialogs.service';
import { GruposService } from 'src/app/service/grupos.service';
import { Horario } from 'src/app/model/entity/horario';
import { HorarioUtil } from 'src/app/util/horario-util';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';

@Component({
  selector: 'app-admin-recursos-grupos-save',
  templateUrl: './admin-recursos-grupos-save.component.html',
  styleUrls: ['./admin-recursos-grupos-save.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminRecursosGruposSaveComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faTrashAlt: IconDefinition = faTrashAlt;

  instructoresList: Usuario[] = [];
  weekDays: string[];
  hours: number[];
  dia: number = 0;
  horaInicio: number = 8;
  horaFin: number = 9;
  showInstructor: boolean = false;

  grupo: Grupo;
  isCreate: boolean = true;
  submitted: boolean = false;

  constructor(
    private location: Location,
    private dialogsService: DialogsService,
    private gruposService: GruposService,
    private authenticationService: AuthenticationService,
    private instructoresService: InstructoresService
  ) {
    this.showInstructor = this.authenticationService.currentUser.role == TipoUsuario.SUPER.abreviatura;
    this.weekDays = HorarioUtil.getWeekDays();
    this.hours = HorarioUtil.getHours(8, 20);
    if (this.gruposService.currentSaveGrupo) {
      this.isCreate = false;
      this.grupo = this.gruposService.currentSaveGrupo;
    } else {
      this.grupo = new Grupo();
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.instructoresService.getAll(true)
      .subscribe(response => {
        this.instructoresList = response;
        this.grupo.instructor.id = this.authenticationService.currentUser.id;
      }, error => {
        console.error("error", error);
      });
  }

  save() {
    this.submitted = true;
    if (this.validateForm()) {
      this.grupo.instructor = this.instructoresList.find(instructor => instructor.id == this.grupo.instructor.id);
      this.gruposService.save(this.grupo, this.isCreate).subscribe(response => {
        if (response.success) {
          this.back();
          this.dialogsService.showToast(response.body, true);
        } else {
          this.dialogsService.showToast(response.body, false);
        }
      }, error => {
        console.error("error", error);
        const msg = "No se pudo " + (this.isCreate) ? "agregar" : "actualizar" + " el grupo, intente de nuevo";
        this.dialogsService.showToast(msg, false);
      });
    } else {
      this.dialogsService.showToast("Debe completar los campos obligatorios", false);
    }
  }

  back() {
    this.location.back();
  }

  validateForm(): boolean {
    if (!this.grupo.nombre) {
      return false;
    } else {
      return true;
    }
  }

  addHorario() {
    const newHorario = new Horario();
    newHorario.dia = Number(this.dia) + 1;
    newHorario.horaInicio = this.horaInicio;
    newHorario.horaFin = this.horaFin;
    var isConflict = false;
    this.grupo.horariosList.forEach(horario => {
      if (horario.searchConflicts(newHorario)) {
        isConflict = true;
      }
    });
    if (!isConflict) {
      this.grupo.horariosList.push(newHorario);
    } else {
      this.dialogsService.showToast("Ya hay un horario que se cruza con este", false);
    }
  }

  deleteHorario(index: number) {
    this.grupo.horariosList.splice(index, 1);
  }

  get hoursEnd(): number[] {
    const init = Number(this.horaInicio) + 1;
    return HorarioUtil.getHours(init, 21);
  }

  getCompleteHour(hour: number): string {
    return HorarioUtil.getStringHour(hour);
  }

  getCompleteDay(day: number): string {
    return this.weekDays[day - 1];
  }

}
