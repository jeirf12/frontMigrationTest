import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/service/eventos.service';
import { Evento } from 'src/app/model/entity/evento';
import { faEye, faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DialogsService } from 'src/app/service/dialogs.service';
import { AdminRecursosEventosViewComponent } from './admin-recursos-eventos-view/admin-recursos-eventos-view.component';

@Component({
  selector: 'app-admin-recursos-eventos',
  templateUrl: './admin-recursos-eventos.component.html',
  styleUrls: ['./admin-recursos-eventos.component.scss']
})
export class AdminRecursosEventosComponent implements OnInit {

  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;

  private eventosList: Evento[];
  page: number = 1;
  pageSize: number = 8;
  collectionSize: number = 0;
  searchKey: string = "";

  constructor(
    private router: Router,
    private dialogsService: DialogsService,
    private authenticationService: AuthenticationService,
    private eventosService: EventosService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.eventosService.getAll()
      .subscribe(response => {
        this.eventosList = response;
        this.collectionSize = this.eventosList.length;
      }, error => {
        console.error("error", error);
      });
  }

  get eventos(): Evento[] {
    if (this.eventosList) {
      return this.eventosList
        .filter(user => user)
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    } else {
      return [];
    }
  }

  add() {
    this.eventosService.currentSaveEvento = null;
    this.router.navigate(['/admin/recursos/eventos/save']);
  }

  view(evento: Evento) {
    this.dialogsService.showEventNewsDialog<Evento>(AdminRecursosEventosViewComponent, evento);
  }

  update(evento: Evento) {
    this.eventosService.currentSaveEvento = evento;
    this.router.navigate(['/admin/recursos/eventos/save']);
  }

  delete(evento: Evento) {
    this.dialogsService.showDeleteConfirmDialog("el evento", evento.titulo)
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.eventosService.delete(evento.id)
            .subscribe(response => {
              this.loadData();
            }, error => {
              console.error("error", error);
            });
        }
      });
  }

}
