import { Component, OnInit, ViewChild } from '@angular/core';
import { Medidas } from 'src/app/model/entity/medidas';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SimpleEnum } from 'src/app/model/enums/simple-enum';
import { EnumsService } from 'src/app/service/enums.service';
import { Deportista } from 'src/app/model/entity/deportista';
import { ValoracionesService } from 'src/app/service/valoraciones.service';
import { DateUtil } from 'src/app/util/date-util';
import { Valoracion } from 'src/app/model/entity/valoracion';
import { Tests } from 'src/app/model/entity/tests';
import { ValoracionUtil } from 'src/app/util/valoracion-util';
import { Location } from '@angular/common';
import { NgbAccordion, NgbDatepickerI18n, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';

@Component({
  selector: 'app-admin-valoraciones-save',
  templateUrl: './admin-valoraciones-save.component.html',
  styleUrls: ['./admin-valoraciones-save.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminValoracionesSaveComponent implements OnInit {

  @ViewChild('accordion', { static: true })
  private accordion: NgbAccordion;

  faCalendar: IconDefinition = faCalendar;

  tiposDeporte: SimpleEnum[];

  deportista: Deportista;
  valoracion: Valoracion = new Valoracion();
  fechaValoracion: NgbDateStruct;
  isCreate: boolean = true;

  legerValues: number[] = [];

  showErros: boolean = false;
  showErrorMsg: boolean = false;
  errorMsg: string;

  constructor(
    private location: Location,
    private enumsService: EnumsService,
    private valoracionesService: ValoracionesService
  ) {
    this.deportista = this.valoracionesService.currentDeportistaValoraciones;
    if (this.valoracionesService.currentSaveValoracion) {
      this.isCreate = false;
      this.valoracion = new Valoracion();
      this.valoracion.setAllData(this.valoracionesService.currentSaveValoracion);
      this.fechaValoracion = DateUtil.dateToStructure(this.valoracion.fecha);
      this.legerValues = ValoracionUtil.stringToLeger(this.valoracion.tests.leger);
    } else {
      this.valoracion = new Valoracion();
      this.fechaValoracion = DateUtil.dateToStructure(new Date());
      this.valoracion.deportista = this.deportista;
      this.valoracion.medidas = new Medidas();
      this.valoracion.tests = new Tests();
      this.valoracion.medidas.edad = this.valoracion.tests.edad = DateUtil.getEdad(this.deportista.info.fechaNacimiento);
      this.valoracion.medidas.genero = this.valoracion.tests.genero = this.deportista.info.genero;
      this.valoracion.tests.feqMaxima = Math.round(208.75 - (this.valoracion.tests.edad * 0.73));
    }
  }

  ngOnInit() {
    this.loadHelperData();
  }

  loadHelperData() {
    this.tiposDeporte = this.enumsService.tiposDeporte;
    this.valoracion.medidas.deporte = this.tiposDeporte[0].descripcion;
  }

  save() {
    if (this.validateForm()) {
      this.valoracion.fecha = DateUtil.structureToDate(this.fechaValoracion);
      this.valoracion.tests.leger = ValoracionUtil.legerToString(this.legerValues);
      this.valoracionesService.save(this.valoracion, this.isCreate).subscribe(response => {
        if (response.success) {
          this.back();
        } else {
          this.showError(response.body);
        }
      }, error => {
        console.error("error", error);
        const method = (this.isCreate) ? "agregar" : "actualizar";
        this.showError("No se pudo " + method + " la valoración, intente de nuevo");
      });
    } else {
      this.accordion.activeIds = ["pn-medidas"];
      this.showError("Debe completar los campos obligatorios");
    }
  }

  back() {
    this.location.back();
  }

  validateForm(): boolean {
    if (
      /* !this.valoracion.medidas.peso || !this.valoracion.medidas.talla || !this.valoracion.medidas.triceps ||
      !this.valoracion.medidas.subEscapular || !this.valoracion.medidas.suprailiaco || !this.valoracion.medidas.abdominal ||
      !this.valoracion.medidas.muslo || !this.valoracion.medidas.pantorrilla || !this.valoracion.medidas.pCabeza ||
      !this.valoracion.medidas.pMuneca || !this.valoracion.medidas.pBrazo || !this.valoracion.medidas.dAntebrazo ||
      !this.valoracion.medidas.pCajaToraxica || !this.valoracion.medidas.pMuslo || !this.valoracion.medidas.pPantorrilla ||
      !this.valoracion.medidas.dBiacromial || !this.valoracion.medidas.dBiltiocristal || !this.valoracion.medidas.dHumero ||
      !this.valoracion.medidas.dFemur || */ !this.fechaValoracion
    ) {
      return false;
    } else {
      return true;
    }
  }

  showError(msg: string) {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    elemMainPanel.scrollTop = 0;
    this.errorMsg = msg;
    this.showErrorMsg = true;
    this.showErros = true;
    setTimeout(() => {
      this.showErrorMsg = false;
    }, 10000);
  }

  panelChange() {
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    elemMainPanel.scrollTop = 0;
  }

  getLegerVelocidad(index: number): string {
    if (this.legerValues[index] && this.legerValues[index] !== 0) {
      return ValoracionUtil.legerVelocidad[index].toString();
    } else {
      return "";
    }

  }

  getLegerVo2Max(index: number): string {
    if (this.legerValues[index] && this.legerValues[index] !== 0) {
      return ValoracionUtil.legerVo2Max[index].toString();
    } else {
      return "";
    }
  }

  ngDoCheck() {
    let lastValue = this.legerValues.filter(lv => lv != null).slice(-1)[0];
    let index = this.legerValues.lastIndexOf(lastValue);
    let stringValue = this.getLegerVo2Max(index);
    if (stringValue != "") {
      this.valoracion.tests.legerAuxValue = Number(stringValue);
    }
  }

}
