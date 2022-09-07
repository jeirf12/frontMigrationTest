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
import { DeportistasService } from 'src/app/service/deportistas.service';
import { Deportista } from 'src/app/model/entity/deportista';
import { SimpleEnum } from 'src/app/model/enums/simple-enum';
import { TipoClasificacion } from 'src/app/model/enums/tipo-clasificacion';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PublicsService } from 'src/app/service/publics.service';
import { Dependencia } from 'src/app/model/entity/dependencia';
import { TipoDeportista } from 'src/app/model/enums/tipo-deportista';
import { TipoDependencia } from 'src/app/model/enums/tipo-dependencia';
import { Programa } from 'src/app/model/entity/programa';
import { SimpleEnumCheck } from 'src/app/model/simple-enum-check';

@Component({
  selector: 'app-admin-deportistas-save',
  templateUrl: './admin-deportistas-save.component.html',
  styleUrls: ['./admin-deportistas-save.component.scss'],
  providers: [
    { provide: NgbDatepickerI18n, useClass: AppDatePickerI18n },
    NgbDatepickerConfig
  ]
})
export class AdminDeportistasSaveComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faDelete: IconDefinition = faTrashAlt;

  tiposDocumento: AbrevEnum[];
  tiposDeportista: SimpleEnum[];
  tiposGenero: AbrevEnum[];
  tiposPatologia: SimpleEnumCheck[];
  dependenciasList: Dependencia[] = [];

  isCreate: boolean = true;

  info: Usuario = new Usuario();
  deportista: Deportista = new Deportista();
  fechaNacimiento: NgbDateStruct;
  submitted: boolean = false;
  showPasswordError: boolean = false;
  nombreConyugue: string = "«Ingresa el documento»";
  tienePatologias: boolean = false;
  otraPatologia: string = "";

  private isBuildingUsername: boolean = false;
  private isBuildingpassword: boolean = false;

  constructor(
    private dialogsService: DialogsService,
    private datePickerConfig: NgbDatepickerConfig,
    private imageCompressService: NgxImageCompressService,
    private authenticationService: AuthenticationService,
    private enumsService: EnumsService,
    private publicsService: PublicsService,
    private deportistasService: DeportistasService,
    private location: Location
  ) {
    this.loadHelperData();
    this.datePickerConfig.minDate = DateUtil.dateToStructure(new Date(-946753200000));
    this.datePickerConfig.maxDate = DateUtil.dateToStructure(new Date());
    if (this.deportistasService.currentSaveDeportista) {
      this.isCreate = false;
      this.deportista = this.deportistasService.currentSaveDeportista;
      this.info = this.deportista.info;
      this.fechaNacimiento = DateUtil.dateToStructure(this.info.fechaNacimiento);

      if (!this.deportista.dependencia) {
        this.deportista.dependencia = new Dependencia();
        this.deportista.dependencia.id = 1;
      }
      if (!this.deportista.programa) {
        this.deportista.programa = new Programa();
        this.deportista.programa.id = 4;
      }

      if (this.deportista.conyugue) {
        this.nombreConyugue = this.deportista.conyugue.info.primerNombre + " " + this.deportista.conyugue.info.primerApellido;
      } else {
        this.deportista.conyugue = new Deportista();
        this.deportista.conyugue.info = new Usuario();
      }

      if (this.deportista.patologias) {
        this.tienePatologias = true;
        const split = this.deportista.patologias.split("|");
        this.tiposPatologia.forEach(patologia => {
          split.forEach(s => {
            if (patologia.descripcion == "Otro" && s.includes("Otro")) {
              patologia.isChecked = true;
              this.otraPatologia = s.split("-")[0];
            } else if (patologia.descripcion == s) {
              patologia.isChecked = true;
            }
          });
        });
      }

    } else {
      this.info = new Usuario();
      this.info.tipoDocumento = this.tiposDocumento[0].abreviatura;
      this.info.tipoUsuario = TipoUsuario.USUARIO.abreviatura;
      this.info.genero = this.tiposGenero[0].abreviatura;

      this.deportista.instructor = new Usuario();
      this.deportista.instructor.id = this.authenticationService.currentUser.id;
      this.deportista.clasificacion = TipoClasificacion.INICIAL_I.descripcion;
      this.deportista.tipoDeportista = this.tiposDeportista[0].descripcion;
      this.deportista.dependencia = new Dependencia();
      this.deportista.dependencia.id = 1;
      this.deportista.programa = new Programa();
      this.deportista.programa.id = 4;
      this.deportista.conyugue = new Deportista();
      this.deportista.conyugue.info = new Usuario();
    }
  }

  ngOnInit() {
  }

  loadHelperData() {
    this.tiposDocumento = this.enumsService.tiposDocumento;
    this.tiposDeportista = this.enumsService.tiposDeportista;
    this.tiposGenero = this.enumsService.tiposGenero;
    this.tiposPatologia = this.enumsService.tiposPatologia;
    this.dependenciasList = this.publicsService.dependencias;
  }

  loadFuncionario() {
    let query = this.deportista.conyugue.info.documento;
    if (query && query.length > 6) {
      this.deportistasService.getByDocumento(query)
        .subscribe({next: ((response) => {
          if (response) {
            this.deportista.conyugue = response;
            this.nombreConyugue = this.deportista.conyugue.info.primerNombre + " " + this.deportista.conyugue.info.primerApellido;
          } else {
            this.nombreConyugue = "«El funcionario no existe»";
          }
        }), error: (() => {
          this.nombreConyugue = "«El funcionario no existe»";
        })});
    } else {
      this.nombreConyugue = "«Ingresa el documento»";
    }
  }

  get dependencias(): Dependencia[] {
    if (this.dependenciasList) {
      switch (this.deportista.tipoDeportista) {
        case TipoDeportista.ESTUDIANTE.descripcion:
        case TipoDeportista.DOCENTE.descripcion:
          return this.dependenciasList.filter(dependencia => dependencia.tipoDependencia == TipoDependencia.FACULTAD.descripcion);
        case TipoDeportista.ADMINISTRATIVO.descripcion:
          return this.dependenciasList.filter(dependencia => dependencia);
        default:
          this.deportista.dependencia.id = null;
          this.deportista.programa.id = null;
          return [];
      }
    } else {
      this.deportista.dependencia.id = null;
      this.deportista.programa.id = null;
      return [];
    }
  }

  get programas(): Programa[] {
    if (this.dependenciasList && this.deportista.dependencia.id) {
      return this.dependenciasList.find(dependencia => dependencia.id == this.deportista.dependencia.id)
        .programasList.filter(programa => programa);
    } else {
      this.deportista.programa.id = null;
      return [];
    }
  }

  save() {
    this.submitted = true;
    if (this.validateForm()) {
      this.info.fechaNacimiento = DateUtil.structureToDate(this.fechaNacimiento);
      this.deportista.info = this.info;
      this.validateInfoBeforeSave();
      this.deportistasService.save(this.deportista, this.isCreate).subscribe({
        next: ((response) => {
        if (response.success) {
          this.dialogsService.showToast(response.body, true);
          this.back();
        } else {
          this.dialogsService.showToast(response.body, false);
        }
      }), error: ((error) => {
        console.error("error", error);
        const msg = "No se pudo " + (this.isCreate) ? "agregar" : "actualizar" + " el usuario, intente de nuevo";
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
    this.validatePassword();

    return !(!this.info.documento || !this.info.username || (!this.info.password && this.isCreate) ||
      this.showPasswordError || !this.info.primerNombre || !this.info.primerApellido || !this.fechaNacimiento ||
      (this.deportista.tipoDeportista == TipoDeportista.FAMILIAR.descripcion && !this.deportista.conyugue));
  }

  buildUsername() {
    if (!this.info.username || this.isBuildingUsername) {
      if (this.info.primerNombre && this.info.primerApellido) {
        this.isBuildingUsername = true;
        this.info.username = AppUtil.removeSpecialCaracters(this.info.primerNombre + "." + this.info.primerApellido).toLowerCase();
      } else {
        this.isBuildingUsername = false;
        this.info.username = null;
      }
    }
  }

  buildPassword() {
    if (!this.info.password || this.isBuildingpassword) {
      if (this.info.documento) {
        this.isBuildingpassword = true;
        this.info.password = this.info.documento;
      } else {
        this.isBuildingpassword = false;
        this.info.password = null;
      }
    }
  }

  tipoUsuarioChange() {
    if (this.deportista.tipoDeportista != TipoDeportista.FAMILIAR.descripcion) {
      this.deportista.dependencia.id = 1;
      this.deportista.programa.id = 4;
    }
  }

  dependenciaChange() {
    this.deportista.programa.id = this.dependenciasList.find(dependencia => dependencia.id == this.deportista.dependencia.id).programasList[0].id;
  }

  validateUsername() {
    this.info.username = AppUtil.removeSpecialCaracters(this.info.username).toLowerCase();
  }

  validatePassword() {
    this.showPasswordError = this.info.password && this.info.password.length < 6;
  }

  validateInfoBeforeSave() {
    switch (this.deportista.tipoDeportista) {
      case TipoDeportista.FAMILIAR.descripcion:
        this.deportista.dependencia = null;
        this.deportista.programa = null;
        break;
      case TipoDeportista.ADMINISTRATIVO.descripcion:
        this.deportista.conyugue = null;
        this.deportista.programa = null;
        break;
      default:
        this.deportista.conyugue = null;
        break;
    }
    if (this.tienePatologias) {
      this.deportista.patologias = "";
      this.tiposPatologia.forEach(patologia => {
        if (patologia.isChecked) {
          if (patologia.descripcion == "Otro") {
            this.deportista.patologias += this.otraPatologia + "-" + patologia.descripcion + "|";
          } else {
            this.deportista.patologias += patologia.descripcion + "|";
          }
        }
      })
    } else {
      this.deportista.patologias = null;
    }
  }

  onSelectFile() {
    this.imageCompressService.uploadFile().then(({ image, orientation }) => {
      this.imageCompressService.compressFile(image, orientation, 50, 50).then(result => {
        let imageSplit = result.split(",");
        this.info.fotoPrefix = imageSplit[0];
        this.info.foto = imageSplit[1];
      })
    });
  }

  deleteFile() {
    this.info.foto = null;
    this.info.fotoPrefix = null;
  }

  get urlFoto(): string {
    return this.info.fotoPrefix + "," + this.info.foto;
  }

}
