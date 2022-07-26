import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IconDefinition, faCalendar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AbrevEnum } from 'src/app/model/enums/abrev-enum';
import { Usuario } from 'src/app/model/entity/usuario';
import { EnumsService } from 'src/app/service/enums.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgbDatepickerI18n, NgbDateStruct, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppDatePickerI18n } from 'src/app/util/app-date-picker-i18n';
import { DateUtil } from 'src/app/util/date-util';
import { AppUtil } from 'src/app/util/app-util';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';
import { DialogsService } from 'src/app/service/dialogs.service';
import { InstructoresService } from 'src/app/service/instructores.service';

@Component({
  selector: 'app-admin-instructores-save',
  templateUrl: './admin-instructores-save.component.html',
  styleUrls: ['./admin-instructores-save.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminInstructoresSaveComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faDelete: IconDefinition = faTrashAlt;

  tiposDocumento: AbrevEnum[];
  tiposUsuario: AbrevEnum[];
  tiposGenero: AbrevEnum[];

  isCreate: boolean = true;

  instructor: Usuario = new Usuario();
  fechaNacimiento: NgbDateStruct;
  submitted: boolean = false;
  showPasswordError: boolean = false;

  private isBuildingUsername: boolean = false;
  private isBuildingpassword: boolean = false;

  constructor(
    private dialogsService: DialogsService,
    private datePickerConfig: NgbDatepickerConfig,
    private imageCompressService: NgxImageCompressService,
    private enumsService: EnumsService,
    private instructoresService: InstructoresService,
    private location: Location
  ) {
    this.datePickerConfig.minDate = DateUtil.dateToStructure(new Date(-946753200000));
    this.datePickerConfig.maxDate = DateUtil.dateToStructure(new Date());
  }

  ngOnInit() {
    this.loadHelperData();
    if (this.instructoresService.currentSaveInstructor) {
      this.isCreate = false;
      this.instructor = this.instructoresService.currentSaveInstructor;
      this.fechaNacimiento = DateUtil.dateToStructure(this.instructor.fechaNacimiento);
    } else {
      this.instructor = new Usuario();
      this.instructor.tipoDocumento = this.tiposDocumento[0].abreviatura;
      this.instructor.tipoUsuario = this.tiposUsuario[0].abreviatura;
      this.instructor.genero = this.tiposGenero[0].abreviatura;
    }
  }

  loadHelperData() {
    this.tiposDocumento = this.enumsService.tiposDocumento;
    this.tiposUsuario = this.enumsService.tiposUsuario.filter(tipoUsuario => tipoUsuario.abreviatura != TipoUsuario.USUARIO.abreviatura);
    this.tiposGenero = this.enumsService.tiposGenero;
  }

  save() {
    this.submitted = true;
    if (this.validateForm()) {
      this.instructor.fechaNacimiento = DateUtil.structureToDate(this.fechaNacimiento);
      this.instructoresService.save(this.instructor, this.isCreate).subscribe(response => {
        if (response.success) {
          this.dialogsService.showToast(response.body, true);
          this.back();
        } else {
          this.dialogsService.showToast(response.body, false);
        }
      }, error => {
        console.error("error", error);
        this.dialogsService.showToast("No se pudo " + (this.isCreate) ? "agregar" : "actualizar" + " el usuario, intente de nuevo", false);
      });
    } else {
      this.dialogsService.showToast("Debe completar los campos obligatorios", false);
    }
  }

  back() {
    this.location.back();
  }

  validateForm(): boolean {
    this.validatePassword();

    return !(!this.instructor.documento || !this.instructor.username || (!this.instructor.password && this.isCreate) ||
      this.showPasswordError || !this.instructor.primerNombre || !this.instructor.primerApellido || !this.fechaNacimiento);
  }

  buildUsername() {
    if (!this.instructor.username || this.isBuildingUsername) {
      if (this.instructor.primerNombre && this.instructor.primerApellido) {
        this.isBuildingUsername = true;
        this.instructor.username = AppUtil.removeSpecialCaracters(this.instructor.primerNombre + "." + this.instructor.primerApellido).toLowerCase();
      } else {
        this.isBuildingUsername = false;
        this.instructor.username = null;
      }
    }
  }

  buildPassword() {
    if (!this.instructor.password || this.isBuildingpassword) {
      if (this.instructor.documento) {
        this.isBuildingpassword = true;
        this.instructor.password = this.instructor.documento;
      } else {
        this.isBuildingpassword = false;
        this.instructor.password = null;
      }
    }
  }

  validateUsername() {
    this.instructor.username = AppUtil.removeSpecialCaracters(this.instructor.username).toLowerCase();
  }

  validatePassword() {
    this.showPasswordError = this.instructor.password && this.instructor.password.length < 6;
  }

  onSelectFile() {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imageCompressService.compressFile(image, orientation, 50, 50).then(result => {
        let imageSplit = result.split(",");
        this.instructor.fotoPrefix = imageSplit[0];
        this.instructor.foto = imageSplit[1];
      })
    });
  }

  deleteFile() {
    this.instructor.foto = null;
    this.instructor.fotoPrefix = null;
  }

  get urlFoto(): string {
    return this.instructor.fotoPrefix + "," + this.instructor.foto;
  }


}
