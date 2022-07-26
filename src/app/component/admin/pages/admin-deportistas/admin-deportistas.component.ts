import { Component, OnInit } from "@angular/core";
import { DeportistasService } from "src/app/service/deportistas.service";
import {
  faSearch,
  faEye,
  faEdit,
  faTrashAlt,
  faHeartbeat,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { ValoracionesService } from "src/app/service/valoraciones.service";
import { DialogsService } from "src/app/service/dialogs.service";
import { EnumsService } from "src/app/service/enums.service";
import { SimpleEnum } from "src/app/model/enums/simple-enum";
import { AdminDeportistasViewComponent } from "./admin-deportistas-view/admin-deportistas-view.component";
import { Deportista } from "src/app/model/entity/deportista";
import { Dependencia } from "src/app/model/entity/dependencia";
import { PublicsService } from "src/app/service/publics.service";
import { TipoDeportista } from "src/app/model/enums/tipo-deportista";
import { Programa } from "src/app/model/entity/programa";
import { TipoDependencia } from "src/app/model/enums/tipo-dependencia";
import { Usuario } from "src/app/model/entity/usuario";
import { InstructoresService } from "src/app/service/instructores.service";

@Component({
  selector: "app-admin-deportistas",
  templateUrl: "./admin-deportistas.component.html",
  styleUrls: ["./admin-deportistas.component.scss"],
})
export class AdminDeportistasComponent implements OnInit {
  faSearch: IconDefinition = faSearch;
  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;
  faHeartbeat: IconDefinition = faHeartbeat;

  instructoresList: Usuario[] = [];
  instructor: Usuario = new Usuario();
  dependenciasList: Dependencia[] = [];
  dependencia: Dependencia = new Dependencia();
  programa: Programa = new Programa();
  tiposDeportista: SimpleEnum[];
  tipoDeportista: string;

  private deportistasList: Deportista[];
  page: number = 1;
  pageSize: number = 8;
  collectionSize: number = 0;
  searchKey: string = "";

  constructor(
    private router: Router,
    private dialogsService: DialogsService,
    private deportistasService: DeportistasService,
    private valoracionesService: ValoracionesService,
    private publicsService: PublicsService,
    private enumsService: EnumsService,
    private instructoresService: InstructoresService
  ) {
    this.tiposDeportista = this.enumsService.tiposDeportista;
    this.tipoDeportista = "Todos";
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dependenciasList = this.publicsService.dependencias;
    this.dependencia.id = -1;
    this.programa.id = -1;
    this.deportistasService.getAll().subscribe(
      (response) => {
        this.deportistasList = response;
        this.collectionSize = this.deportistasList.length;
      },
      (error) => {
        console.error("error", error);
      }
    );
    this.instructoresService.getAll(true).subscribe(
      (response) => {
        this.instructoresList = response;
        this.instructor.id = -1;
      },
      (error) => {
        console.error("error", error);
      }
    );
  }

  get deportistas(): Deportista[] {
    if (this.deportistasList) {
      return this.deportistasList
        .filter(
          (user) =>
            (user.info.documento
              .toString()
              .toLowerCase()
              .includes(this.searchKey.toLowerCase()) ||
              (user.info.primerNombre + " " + user.info.primerApellido)
                .toLowerCase()
                .includes(this.searchKey.toLowerCase())) &&
            (this.tipoDeportista == "Todos" ||
              user.tipoDeportista == this.tipoDeportista) &&
            (this.instructor.id == -1 ||
              user.instructor.id == this.instructor.id) &&
            (this.dependencia.id == -1 ||
              user.dependencia.id == this.dependencia.id) &&
            (this.programa.id == -1 || user.programa.id == this.programa.id)
        )
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    } else {
      return [];
    }
  }

  add() {
    this.deportistasService.currentSaveDeportista = null;
    this.router.navigate(["/admin/deportistas/save"]);
  }

  view(deportista: Deportista) {
    this.dialogsService.showViewDialog<Deportista>(
      AdminDeportistasViewComponent,
      deportista
    );
  }

  update(deportista: Deportista) {
    this.deportistasService.currentSaveDeportista = deportista;
    this.router.navigate(["/admin/deportistas/save"]);
  }

  delete(deportista: Deportista) {
    this.dialogsService
      .showDeleteConfirmDialog(
        "el deportista",
        deportista.info.primerNombre + " " + deportista.info.primerApellido
      )
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.deportistasService.delete(deportista.id).subscribe(
            (response) => {
              this.dialogsService.showToast(response.body, true);
              this.loadData();
            },
            (error) => {
              console.error("error", error);
            }
          );
        }
      });
  }

  valoracion(deportista: Deportista) {
    this.valoracionesService.currentDeportistaValoraciones = deportista;
    this.router.navigate(["/admin/deportistas/valoraciones"]);
  }

  get dependencias(): Dependencia[] {
    if (this.dependenciasList) {
      switch (this.tipoDeportista) {
        case TipoDeportista.ESTUDIANTE.descripcion:
        case TipoDeportista.DOCENTE.descripcion:
          return this.dependenciasList.filter(
            (dependencia) =>
              dependencia.tipoDependencia ==
              TipoDependencia.FACULTAD.descripcion
          );
        case TipoDeportista.ADMINISTRATIVO.descripcion:
          return this.dependenciasList.filter((dependencia) => dependencia);
        default:
          this.dependencia.id = -1;
          this.programa.id = -1;
          return [];
      }
    } else {
      this.dependencia.id = -1;
      this.programa.id = -1;
      return [];
    }
  }

  get programas(): Programa[] {
    if (this.dependenciasList && this.dependencia.id != -1) {
      return this.dependenciasList
        .find((dependencia) => dependencia.id == this.dependencia.id)
        .programasList.filter((programa) => programa);
    } else {
      this.programa.id = -1;
      return [];
    }
  }

  dependenciaChange() {
    if (this.dependencia.id != -1) {
      this.programa.id = this.dependenciasList.find(
        (dependencia) => dependencia.id == this.dependencia.id
      ).programasList[0].id;
    }
  }
}
