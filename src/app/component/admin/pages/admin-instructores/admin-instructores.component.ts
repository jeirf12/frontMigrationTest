import { Component, OnInit } from '@angular/core';
import { InstructoresService } from 'src/app/service/instructores.service';
import { faSearch, faEye, faEdit, faTrashAlt, faHeartbeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DialogsService } from 'src/app/service/dialogs.service';
import { AdminInstructoresViewComponent } from './admin-instructores-view/admin-instructores-view.component';
import { Usuario } from 'src/app/model/entity/usuario';

@Component({
  selector: 'app-admin-instructores',
  templateUrl: './admin-instructores.component.html',
  styleUrls: ['./admin-instructores.component.scss']
})
export class AdminInstructoresComponent implements OnInit {

  faSearch: IconDefinition = faSearch;
  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;

  private instructoresList: Usuario[];
  page: number = 1;
  pageSize: number = 8;
  collectionSize: number = 0;
  searchKey: string = "";

  constructor(
    private router: Router,
    private dialogsService: DialogsService,
    private instructoresService: InstructoresService,
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.instructoresService.getAll(false)
      .subscribe({next: ((response) => {
        this.instructoresList = response;
        this.collectionSize = this.instructoresList.length;
      }),error: ((error) => {
        console.error("error", error);
      })});
  }

  get instructores(): Usuario[] {
    if (this.instructoresList) {
      return this.instructoresList
        .filter(user =>
          (user.documento.toString().toLowerCase().includes(this.searchKey.toLowerCase()) ||
            (user.primerNombre + ' ' + user.primerApellido).toLowerCase().includes(this.searchKey.toLowerCase()))
        )
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    } else {
      return [];
    }
  }

  add() {
    this.instructoresService.currentSaveInstructor = null;
    this.router.navigate(['/admin/instructores/save']);
  }

  view(instructor: Usuario) {
    this.dialogsService.showViewDialog<Usuario>(AdminInstructoresViewComponent, instructor);
  }

  update(instructor: Usuario) {
    this.instructoresService.currentSaveInstructor = instructor;
    this.router.navigate(['/admin/instructores/save']);
  }

  delete(instructor: Usuario) {
    this.dialogsService.showDeleteConfirmDialog("el instructor", instructor.primerNombre + ' ' + instructor.primerApellido)
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.instructoresService.delete(instructor.id)
            .subscribe({next: ((response) => {
              this.dialogsService.showToast(response.body, true);
              this.loadData();
            }), error: ((error) => {
              console.error("error", error);
            })});
        }
      });
  }

}
