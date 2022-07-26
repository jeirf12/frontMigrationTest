import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/model/entity/noticia';
import { IconDefinition, faCalendar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbDatepickerI18n, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Location } from '@angular/common';
import { NoticiasService } from 'src/app/service/noticias.service';
import { DateUtil } from 'src/app/util/date-util';
import { DialogsService } from 'src/app/service/dialogs.service';

@Component({
  selector: 'app-admin-recursos-noticias-save',
  templateUrl: './admin-recursos-noticias-save.component.html',
  styleUrls: ['./admin-recursos-noticias-save.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminRecursosNoticiasSaveComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faDelete: IconDefinition = faTrashAlt;

  noticia: Noticia = new Noticia();
  fechaCaducidad: NgbDateStruct;
  isCreate: boolean = true;
  submitted: boolean = false;

  constructor(
    private location: Location,
    private dialogsService: DialogsService,
    private noticiasService: NoticiasService,
    private imageCompressService: NgxImageCompressService,
  ) {
    this.noticia.visible = true;
    if (this.noticiasService.currentSaveNoticia) {
      this.isCreate = false;
      this.noticia = this.noticiasService.currentSaveNoticia;
      this.fechaCaducidad = DateUtil.dateToStructure(this.noticia.fechaCaducidad);
    }
  }

  ngOnInit(): void {
  }

  save() {
    this.submitted = true;
    if (this.validateForm()) {
      this.noticia.fechaCreacion = new Date();
      this.noticia.fechaCaducidad = DateUtil.structureToDate(this.fechaCaducidad);
      this.noticiasService.save(this.noticia, this.isCreate).subscribe(response => {
        if (response.success) {
          this.back();
          this.dialogsService.showToast(response.body, true);
        } else {
          this.dialogsService.showToast(response.body, false);
        }
      }, error => {
        console.error("error", error);
        const msg = "No se pudo " + (this.isCreate) ? "agregar" : "actualizar" + " el noticia, intente de nuevo";
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
    if (!this.noticia.titulo || !this.fechaCaducidad || !this.noticia.contenido) {
      return false;
    } else {
      return true;
    }
  }

  onSelectFile() {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imageCompressService.compressFile(image, orientation, 50, 50).then(result => {
        let imageSplit = result.split(",");
        this.noticia.imagenPrefix = imageSplit[0];
        this.noticia.imagen = imageSplit[1];
      })
    });
  }

  deleteFile() {
    this.noticia.imagen = null;
    this.noticia.imagenPrefix = null;
  }

  get urlImagen(): string {
    return this.noticia.imagenPrefix + "," + this.noticia.imagen;
  }
}
