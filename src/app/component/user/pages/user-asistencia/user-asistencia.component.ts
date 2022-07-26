import { Component, OnInit } from '@angular/core';
import { UserDeportistaService } from 'src/app/service/user-deportista.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Inscripcion } from 'src/app/model/entity/inscripcion';
import { DateUtil } from 'src/app/util/date-util';
import { Asistencia } from 'src/app/model/entity/asistencia';
import { TwoObjects } from 'src/app/model/two-objects';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-asistencia',
  templateUrl: './user-asistencia.component.html',
  styleUrls: ['./user-asistencia.component.scss'],
  providers: [DatePipe]
})
export class UserAsistenciaComponent implements OnInit {

  inscripcionesList: Inscripcion[] = [];
  asistenciaList: string[] = [];

  constructor(
    private datePipe: DatePipe,
    private authenticationService: AuthenticationService,
    private userDeportistaService: UserDeportistaService
  ) { }

  ngOnInit(): void {
    this.userDeportistaService.getInscripcionesByDeportista(this.authenticationService.currentUser.id)
      .subscribe(inscripcionResponse => {
        this.userDeportistaService.getAsistenciaByDeportista(this.authenticationService.currentUser.id)
          .subscribe(asistenciaResponse => {
            this.inscripcionesList = inscripcionResponse;
            this.asistenciaList = this.getAllAsistencias(asistenciaResponse);
          }, error => {
            console.error("error", error);
          });
      }, error => {
        console.error("error", error);
      });
  }

  getAllClassDaysOfMonth(inscripcion: Inscripcion): Date[] {
    const result: Date[] = [];
    const weekDays: number[] = [];
    inscripcion.grupo.horariosList.forEach(horario => {
      weekDays.push(horario.dia);
    });
    const today = new Date();
    var date = new Date(inscripcion.anio, inscripcion.mes - 1, 1);
    while (date.getMonth() === inscripcion.mes - 1) {
      if (weekDays.includes(date.getDay()) && date <= today) {
        if (this.asistenciaList.includes(this.datePipe.transform(date, "dd-MM-yyyy"))) {
          result.push(new Date(date));
        }
      }
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  getAllAsistencias(asistencias: Asistencia[]): string[] {
    const result: string[] = [];
    asistencias.forEach(asistencia => {
      result.push(this.datePipe.transform(asistencia.fecha, "dd-MM-yyyy"));
    });
    return result;
  }

  getMonthFullName(inscripcion: Inscripcion): string {
    return DateUtil.getMonthFullName(inscripcion.mes) + "-" + inscripcion.anio;
  }

}
