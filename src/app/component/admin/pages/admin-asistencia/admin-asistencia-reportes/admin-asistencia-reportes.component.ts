import { Component, OnInit } from '@angular/core';
import { IconDefinition, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { EnumsService } from 'src/app/service/enums.service';
import { TipoReporte } from 'src/app/model/enums/tipo-reporte';
import { NgbDatepickerI18n, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { DateUtil } from 'src/app/util/date-util';
import { DialogsService } from 'src/app/service/dialogs.service';
import { TwoObjects } from 'src/app/model/two-objects';
import { ReportesService } from 'src/app/service/reportes.service';
import { DataChart } from 'src/app/model/data-chart';
import { DataReporte } from 'src/app/model/data-reporte';
import { PublicsService } from 'src/app/service/publics.service';
import { FiltroReporteRequest } from 'src/app/model/request/filtro-reporte-request';
import { Programa } from 'src/app/model/entity/programa';

@Component({
  selector: 'app-admin-asistencia-reportes',
  templateUrl: './admin-asistencia-reportes.component.html',
  styleUrls: ['./admin-asistencia-reportes.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminAsistenciaReportesComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;

  tipoReporte: string;
  fechaDesde: NgbDateStruct;
  fechaHasta: NgbDateStruct;
  year: number;
  semester: string;

  reporteEspecifico: boolean = false;
  filtroReporte: FiltroReporteRequest = new FiltroReporteRequest();

  especificoInscripciones: DataChart = new DataChart('bar', "Específico Inscripciones");
  especificoAsistencia: DataChart = new DataChart('bar', "Específico  Asistencia");

  showCharts: boolean = false;

  generalInscripciones: DataChart = new DataChart('bar', "General Inscripciones");
  generalAsistencia: DataChart = new DataChart('bar', "General  Asistencia");

  generoInscripciones: DataChart = new DataChart('doughnut', "Inscripciones por género");
  generoAsistencia: DataChart = new DataChart('doughnut', "Asistencia por género");
  edadInscripciones: DataChart = new DataChart('doughnut', "Inscripciones por edad");
  edadAsistencia: DataChart = new DataChart('doughnut', "Asistencia por edad");
  tipoInscripciones: DataChart = new DataChart('doughnut', "Inscripciones por tipo de usuario");
  tipoAsistencia: DataChart = new DataChart('doughnut', "Asistencia por tipo de usuario");
  clasificacionInscripciones: DataChart = new DataChart('doughnut', "Inscripciones por clasificacion");
  clasificacionAsistencia: DataChart = new DataChart('doughnut', "Asistencia por clasificacion");
  patologiaInscripciones: DataChart = new DataChart('horizontalBar', "Inscripciones por patología");
  patologiaAsistencia: DataChart = new DataChart('horizontalBar', "Asistencia por patología");

  dependenciaInscripciones: DataChart = new DataChart('horizontalBar', "Inscripciones por dependencia");
  dependenciaAsistencia: DataChart = new DataChart('horizontalBar', "Asistencia por dependencia");
  programaInscripciones: DataChart = new DataChart('horizontalBar', "Inscripciones por programa");
  programaAsistencia: DataChart = new DataChart('horizontalBar', "Asistencia por programa");

  constructor(
    public enumsService: EnumsService,
    public publicsService: PublicsService,
    private datePickerConfig: NgbDatepickerConfig,
    private dialogsService: DialogsService,
    private reportesService: ReportesService
  ) {
    this.datePickerConfig.maxDate = DateUtil.dateToStructure(new Date());
    this.tipoReporte = TipoReporte.RANGO.descripcion;
    this.onTipoReporteChange()
  }

  ngOnInit(): void {

  }

  validateFiltros(): boolean {
    return this.reporteEspecifico && (this.filtroReporte.dependenciaId != -1 || this.filtroReporte.programaId != -1 ||
      this.filtroReporte.tipoDeportista != "" || this.filtroReporte.clasificacion != "");
  }

  generar() {
    this.showCharts = false;
    if (this.validateFiltros()) {
      const request = new FiltroReporteRequest();
      request.fechaDesde = DateUtil.structureToDate(this.fechaDesde);
      request.fechaHasta = DateUtil.structureToDate(this.fechaHasta);
      request.dependenciaId = (this.filtroReporte.dependenciaId !== -1) ? this.filtroReporte.dependenciaId : null;
      request.programaId = (this.filtroReporte.programaId !== -1) ? this.filtroReporte.programaId : null;
      request.tipoDeportista = (this.filtroReporte.tipoDeportista !== "") ? this.filtroReporte.tipoDeportista : null;
      request.clasificacion = (this.filtroReporte.clasificacion !== "") ? this.filtroReporte.clasificacion : null;
      this.reportesService.getEspecifico(request).subscribe({next: ((response) => {
        console.log(response);
        this.especificoInscripciones.setChartDataSet(DataReporte.buildChartDataSet(response.inscripciones));
        this.especificoAsistencia.setChartDataSet(DataReporte.buildChartDataSet(response.asistencia));
        this.showCharts = true;
      }), error: ((error) => {
        console.error("error", error);
      })});
    } else {
      this.reporteEspecifico = false;
      const request = new TwoObjects<Date, Date>();
      request.first = DateUtil.structureToDate(this.fechaDesde);
      request.second = DateUtil.structureToDate(this.fechaHasta);
      this.reportesService.getGeneral(request).subscribe({next: ((response) => {
        console.log(response);
        this.generalInscripciones.setChartDataSet(DataReporte.buildChartDataSet(response.general.inscripciones));
        this.generalAsistencia.setChartDataSet(DataReporte.buildChartDataSet(response.general.asistencia));

        this.generoInscripciones.setMultiDataSet(DataReporte.buildMultiDataSet(response.genero.inscripciones));
        this.generoAsistencia.setMultiDataSet(DataReporte.buildMultiDataSet(response.genero.asistencia));
        this.edadInscripciones.setMultiDataSet(DataReporte.buildMultiDataSet(response.edad.inscripciones));
        this.edadAsistencia.setMultiDataSet(DataReporte.buildMultiDataSet(response.edad.asistencia));
        this.tipoInscripciones.setMultiDataSet(DataReporte.buildMultiDataSet(response.tipo.inscripciones));
        this.tipoAsistencia.setMultiDataSet(DataReporte.buildMultiDataSet(response.tipo.asistencia));
        this.clasificacionInscripciones.setMultiDataSet(DataReporte.buildMultiDataSet(response.clasificacion.inscripciones));
        this.clasificacionAsistencia.setMultiDataSet(DataReporte.buildMultiDataSet(response.clasificacion.asistencia));
        this.patologiaInscripciones.setChartDataSet(DataReporte.buildChartDataSet(response.patologia.inscripciones));
        this.patologiaAsistencia.setChartDataSet(DataReporte.buildChartDataSet(response.patologia.asistencia));

        this.dependenciaInscripciones.setChartDataSet(DataReporte.buildChartDataSet(response.dependencia.inscripciones));
        this.dependenciaAsistencia.setChartDataSet(DataReporte.buildChartDataSet(response.dependencia.asistencia));
        this.programaInscripciones.setChartDataSet(DataReporte.buildChartDataSet(response.programa.inscripciones));
        this.programaAsistencia.setChartDataSet(DataReporte.buildChartDataSet(response.programa.asistencia));

        this.showCharts = true;
      }), error: ((error) => {
        console.error("error", error);
      })});
    }
  }

  onTipoReporteChange() {
    const date = new Date();
    switch (this.tipoReporte) {
      case TipoReporte.RANGO.descripcion:
        this.fechaHasta = DateUtil.dateToStructure(date);
        date.setMonth(date.getMonth() - 1);
        this.fechaDesde = DateUtil.dateToStructure(date);
        break;
      case TipoReporte.ANUAL.descripcion:
        this.year = date.getFullYear();
        this.onYearChange();
        break;
      case TipoReporte.SEMESTRAL.descripcion:
        const semester = date.getMonth() < 6 ? "I" : "II";
        this.semester = date.getFullYear() + "-" + semester;
        this.onSemesterChange();
        break;
      case TipoReporte.MENSUAL.descripcion:
        const motnhRange = DateUtil.getMonthRange(date.getFullYear(), date.getMonth());
        this.fechaDesde = DateUtil.dateToStructure(motnhRange.first);
        this.fechaHasta = DateUtil.dateToStructure(motnhRange.second);
        break;
    }
  }

  onYearChange() {
    const yearRange = DateUtil.getYearRange(this.year);
    this.fechaDesde = DateUtil.dateToStructure(yearRange.first);
    this.fechaHasta = DateUtil.dateToStructure(yearRange.second);
  }

  onSemesterChange() {
    const semestreRange = DateUtil.getSemesterRange(this.semester);
    this.fechaDesde = DateUtil.dateToStructure(semestreRange.first);
    this.fechaHasta = DateUtil.dateToStructure(semestreRange.second);
  }

  showMonthPicker() {
    this.dialogsService.showMonthPicker(this.fechaDesde.month, this.fechaDesde.year).subscribe((response: TwoObjects<number, number>) => {
      const motnhRange = DateUtil.getMonthRange(response.first, response.second - 1);
      this.fechaDesde = DateUtil.dateToStructure(motnhRange.first);
      this.fechaHasta = DateUtil.dateToStructure(motnhRange.second);
    });
  }

  getMonthYear(): string {
    return DateUtil.getMonthFullName(this.fechaDesde.month) + " - " + this.fechaDesde.year;
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

  get programas(): Programa[] {
    if (this.filtroReporte.dependenciaId != -1) {
      return this.publicsService.dependencias.find(dependencia => dependencia.id == this.filtroReporte.dependenciaId)
        .programasList.filter(programa => programa);
    } else {
      this.filtroReporte.programaId = -1;
      return [];
    }
  }

  onReporteEspecificoChange() {
    this.filtroReporte = new FiltroReporteRequest();
  }

  panelChange() {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    elemMainPanel.scrollTop = 0;
  }

}
