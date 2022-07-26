import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/model/entity/grupo';
import { Router } from '@angular/router';
import { DialogsService } from 'src/app/service/dialogs.service';
import { GruposService } from 'src/app/service/grupos.service';
import { TwoObjects } from 'src/app/model/two-objects';
import { DateUtil } from 'src/app/util/date-util';
import { Horario } from 'src/app/model/entity/horario';
import { HorarioUtil } from 'src/app/util/horario-util';
import { ReportesService } from 'src/app/service/reportes.service';
import { ReporteAnualAsistencia } from 'src/app/model/entity/reporte-anual-asistencia';
import { ReporteMensualAsistencia } from 'src/app/model/entity/reporte-mensual-asistencia';
import { Dependencia } from 'src/app/model/entity/dependencia';
import { Programa } from 'src/app/model/entity/programa';
import { PublicsService } from 'src/app/service/publics.service';

@Component({
  selector: 'app-admin-asistencia-exportar',
  templateUrl: './admin-asistencia-exportar.component.html',
  styleUrls: ['./admin-asistencia-exportar.component.scss']
})
export class AdminAsistenciaExportarComponent implements OnInit {

  gruposList: Grupo[] = [];
  grupoIndex: number;
  year: number;
  month: number;
  tipoReporte: string;
  semester: string;

  dependenciasList: Dependencia[] = [];
  dependencia: Dependencia = new Dependencia();
  programa: Programa = new Programa();

  reportes: ReporteAnualAsistencia[] = [];
  reportesMensual: ReporteMensualAsistencia[] = [];
  showLoader: boolean = false;
  file: Blob;
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0;

  constructor(
    private router: Router,
    private dialogsService: DialogsService,
    private gruposService: GruposService,
    private publicsService: PublicsService,
    private reportesService: ReportesService
  ) {
    this.year = DateUtil.dateToStructure(new Date()).year;
    this.tipoReporte = "Anual";
  }

  ngOnInit(): void {
    this.loadHelperData();
  }

  loadHelperData() {
    this.dependenciasList = this.publicsService.dependencias;
    this.dependencia.id = -1;
    this.programa.id = -1;
    this.gruposService.getAll().subscribe(response => {
      this.gruposList = response;
      if (this.gruposList.length > 0) {
        this.grupoIndex = 0;
        this.loadReporte();
      }
    }, error => {
      console.error("error", error);
    });
  }

  loadReporte() {
    if (this.gruposList.length > 0) {
      this.showLoader = true;
      switch (this.tipoReporte) {
        case "Anual":
          this.reportesService.getReporteAnualAsistencia(this.year, this.gruposList[this.grupoIndex].id,
            this.dependencia.id, this.programa.id).subscribe(response => {
              this.reportes = response;
            }, error => {
              console.error("error", error);
            });
          this.reportesService.getReporteAnualAsistenciaFile(this.year, this.gruposList[this.grupoIndex].id,
            this.dependencia.id, this.programa.id).subscribe(response => {
              this.showLoader = false;
              if (response) {
                this.file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
              } else {
                this.file = null;
              }
            }, error => {
              console.error("Error", error);
            });
          break;
        case "Semestral":
          this.reportesService.getReporteAnualAsistencia(this.year, this.gruposList[this.grupoIndex].id,
            this.dependencia.id, this.programa.id).subscribe(response => {
              this.reportes = response;
            }, error => {
              console.error("error", error);
            });
          const semestre = (this.semester.split("-")[1] == "I") ? 1 : 2;
          this.reportesService.getReporteSemestralAsistenciaFile(this.year, semestre, this.gruposList[this.grupoIndex].id,
            this.dependencia.id, this.programa.id).subscribe(response => {
              this.showLoader = false;
              if (response) {
                this.file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
              } else {
                this.file = null;
              }
            }, error => {
              console.error("Error", error);
            });
          break;
        case "Mensual":
          this.reportesService.getReporteMensualAsistencia(this.year, this.month, this.gruposList[this.grupoIndex].id,
            this.dependencia.id, this.programa.id).subscribe(response => {
              this.reportesMensual = response;
            }, error => {
              console.error("error", error);
            });
          this.reportesService.getReporteMensualAsistenciaFile(this.year, this.month, this.gruposList[this.grupoIndex].id,
            this.dependencia.id, this.programa.id).subscribe(response => {
              this.showLoader = false;
              if (response) {
                this.file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
              } else {
                this.file = null;
              }
            }, error => {
              console.error("Error", error);
            });
          break;
      }

    }
  }

  export() {
    let objNavigator:any;
    objNavigator = window.navigator;
    if (objNavigator && objNavigator.msSaveOrOpenBlob) {
      objNavigator.msSaveOrOpenBlob(this.file);
      return;
    }
    const data = window.URL.createObjectURL(this.file);
    const link = document.createElement('a');
    link.href = data;

    var fileName = "";
    switch (this.tipoReporte) {
      case "Mensual":
        fileName = "Reporte Mensual de asistencia " + DateUtil.getMonthFullName(this.month) + " " + this.year;
        break;
      case "Semestral":
        fileName = "Reporte Semestral de asistencia " + this.semester;
        break;
      default:
        fileName = "Reporte Anual de asistencia " + this.year;
        break;
    }

    link.download = fileName + ".xlsx";
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

  get years(): number[] {
    const result: number[] = [];
    const thisYear = new Date().getFullYear();
    for (let i = thisYear; i >= 2015; i--) {
      result.push(i);
    }
    return result;
  }

  get semesters(): string[] {
    const result: string[] = [];
    const today = new Date();
    var actualSemester = today.getMonth() < 6 ? "I" : "II";
    for (let i = today.getFullYear(); i >= 2015; i--) {
      if (actualSemester == "I" && i == today.getFullYear()) {
        result.push(i + "-I");
      } else {
        result.push(i + "-II");
        result.push(i + "-I");
      }
    }
    return result;
  }

  get dependencias(): Dependencia[] {
    if (this.dependenciasList) {
      return this.dependenciasList;
    } else {
      this.dependencia.id = -1;
      this.programa.id = -1;
      return [];
    }
  }

  get programas(): Programa[] {
    if (this.dependenciasList && this.dependencia.id != -1) {
      return this.dependenciasList.find(dependencia => dependencia.id == this.dependencia.id)
        .programasList.filter(programa => programa);
    } else {
      this.programa.id = -1;
      return [];
    }
  }

  dependenciaChange() {
    this.programa.id = -1;
    this.loadReporte();
  }

  programaChange() {
    this.loadReporte();
  }

  getHorarioCompleto(horario: Horario): string {
    return HorarioUtil.getHorarioCompleto(horario);
  }

  goToGrupos() {
    this.router.navigate(['admin/recursos/grupos']);
  }

  showMonthPicker() {
    this.dialogsService.showMonthPicker(this.month, this.year).subscribe((response: TwoObjects<number, number>) => {
      this.year = response.first;
      this.month = response.second;
      this.loadReporte();
    });
  }

  getMonthYear(): string {
    return DateUtil.getMonthFullName(this.month) + " - " + this.year;
  }

  onTipoReporteChange() {
    this.file = null;
    switch (this.tipoReporte) {
      case "Anual":
        this.year = DateUtil.dateToStructure(new Date()).year;
        break;
      case "Semestral":
        this.semester = this.semesters[0];
        break;
      case "Mensual":
        const date = DateUtil.dateToStructure(new Date());
        this.year = date.year;
        this.month = date.month;
        break;
    }
    this.loadReporte();
  }

  showColumn(month: number): boolean {
    if (this.tipoReporte == "Anual") {
      return true;
    } else {
      const semestre = (this.semester.split("-")[1] == "I") ? 1 : 2;
      return (semestre == 1 && month <= 6) || (semestre == 2 && month >= 7);
    }
  }

  getTotal(reporte: ReporteAnualAsistencia): number {
    if (this.tipoReporte == "Anual") {
      return reporte.total;
    } else {
      if (this.semester.split("-")[1] == "I") {
        return reporte.firstTotal;
      } else {
        return reporte.secondTotal;
      }
    }
  }

}
