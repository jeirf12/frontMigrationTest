import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/model/entity/evento';
import { IconDefinition, faCalendar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbDatepickerI18n, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Location } from '@angular/common';
import { EventosService } from 'src/app/service/eventos.service';
import { DateUtil } from 'src/app/util/date-util';
import { DialogsService } from 'src/app/service/dialogs.service';

@Component({
  selector: 'app-admin-recursos-eventos-save',
  templateUrl: './admin-recursos-eventos-save.component.html',
  styleUrls: ['./admin-recursos-eventos-save.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminRecursosEventosSaveComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faDelete: IconDefinition = faTrashAlt;

  evento: Evento = new Evento();
  fechaEvento: NgbDateStruct;
  isCreate: boolean = true;
  submitted: boolean = false;

  constructor(
    private location: Location,
    private dialogsService: DialogsService,
    private eventosService: EventosService,
    private imageCompressService: NgxImageCompressService,
  ) {
    if (this.eventosService.currentSaveEvento) {
      this.isCreate = false;
      this.evento = this.eventosService.currentSaveEvento;
      this.fechaEvento = DateUtil.dateToStructure(this.evento.fecha);
    }
  }

  ngOnInit(): void {
  }

  save() {
    this.submitted = true;
    if (this.validateForm()) {
      this.evento.fecha = DateUtil.structureToDate(this.fechaEvento);
      this.eventosService.save(this.evento, this.isCreate).subscribe({next: ((response) => {
        if (response.success) {
          this.back();
          this.dialogsService.showToast(response.body, true);
        } else {
          this.dialogsService.showToast(response.body, false);
        }
      }),error: ((error) => {
        console.error("error", error);
        const msg = "No se pudo " + (this.isCreate) ? "agregar" : "actualizar" + " el evento, intente de nuevo";
        this.dialogsService.showToast(msg, false);
      })});
    } else {
      this.dialogsService.showToast("Debe completar los campos obligatorios", false);
    }
  }

  back() {
    this.location.back();
  }

  validateForm(): boolean {
    if (!this.evento.titulo || !this.fechaEvento || !this.evento.lugar || !this.evento.contenido) {
      return false;
    } else {
      return true;
    }
  }

  onSelectFile() {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imageCompressService.compressFile(image, orientation, 50, 50).then(result => {
        let imageSplit = result.split(",");
        this.evento.imagenPrefix = imageSplit[0];
        this.evento.imagen = imageSplit[1];
      })
    });
  }

  deleteFile() {
    this.evento.imagen = null;
    this.evento.imagenPrefix = null;
  }

  get urlImagen(): string {
    return this.evento.imagenPrefix + "," + this.evento.imagen;
  }

}
