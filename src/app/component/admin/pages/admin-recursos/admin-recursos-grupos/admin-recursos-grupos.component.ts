import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/service/grupos.service';
import { Grupo } from 'src/app/model/entity/grupo';
import { faEye, faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DialogsService } from 'src/app/service/dialogs.service';
import { AdminRecursosGruposViewComponent } from './admin-recursos-grupos-view/admin-recursos-grupos-view.component';
import { Usuario } from 'src/app/model/entity/usuario';
import { InstructoresService } from 'src/app/service/instructores.service';

@Component({
  selector: 'app-admin-recursos-grupos',
  templateUrl: './admin-recursos-grupos.component.html',
  styleUrls: ['./admin-recursos-grupos.component.scss']
})
export class AdminRecursosGruposComponent implements OnInit {

  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;

  instructoresList: Usuario[] = [];
  instructor: Usuario = new Usuario();

  private gruposList: Grupo[];
  page: number = 1;
  pageSize: number = 8;
  collectionSize: number = 0;
  searchKey: string = "";

  constructor(
    private router: Router,
    private dialogsService: DialogsService,
    private authenticationService: AuthenticationService,
    private gruposService: GruposService,
    private instructoresService: InstructoresService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.gruposService.getAll()
      .subscribe(response => {
        console.log(response);
        this.gruposList = response;
        this.collectionSize = this.gruposList.length;
      }, error => {
        console.error("error", error);
      });

      this.instructoresService.getAll(true)
      .subscribe(response => {
        this.instructoresList = response;
        this.instructor.id = -1;
      }, error => {
        console.error("error", error);
      });
  }

  get grupos(): Grupo[] {
    if (this.gruposList) {
      return this.gruposList
        .filter(group => (this.instructor.id == -1 || group.instructor.id == this.instructor.id ) )
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    } else {
      return [];
    }
  }

  add() {
    this.gruposService.currentSaveGrupo = null;
    this.router.navigate(['/admin/recursos/grupos/save']);
  }

  view(grupo: Grupo) {
    this.dialogsService.showEventNewsDialog<Grupo>(AdminRecursosGruposViewComponent, grupo);
  }

  update(grupo: Grupo) {
    this.gruposService.currentSaveGrupo = grupo;
    this.router.navigate(['/admin/recursos/grupos/save']);
  }

  delete(grupo: Grupo) {
    this.dialogsService.showDeleteConfirmDialog("el grupo", grupo.nombre)
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.gruposService.delete(grupo.id)
            .subscribe(response => {
              this.loadData();
            }, error => {
              console.error("error", error);
            });
        }
      });
  }

}
