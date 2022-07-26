import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/service/noticias.service';
import { Noticia } from 'src/app/model/entity/noticia';
import { faEye, faEdit, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DialogsService } from 'src/app/service/dialogs.service';
import { AdminRecursosNoticiasViewComponent } from './admin-recursos-noticias-view/admin-recursos-noticias-view.component';

@Component({
  selector: 'app-admin-recursos-noticias',
  templateUrl: './admin-recursos-noticias.component.html',
  styleUrls: ['./admin-recursos-noticias.component.scss']
})
export class AdminRecursosNoticiasComponent implements OnInit {

  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;

  private noticiasList: Noticia[];
  page: number = 1;
  pageSize: number = 8;
  collectionSize: number = 0;
  searchKey: string = "";

  constructor(
    private router: Router,
    private dialogsService: DialogsService,
    private authenticationService: AuthenticationService,
    private noticiasService: NoticiasService
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.noticiasService.getAll()
      .subscribe(response => {
        this.noticiasList = response;
        this.collectionSize = this.noticiasList.length;
      }, error => {
        console.error("error", error);
      });
  }

  get noticias(): Noticia[] {
    if (this.noticiasList) {
      return this.noticiasList
        .filter(user => user)
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    } else {
      return [];
    }
  }

  add() {
    this.noticiasService.currentSaveNoticia = null;
    this.router.navigate(['/admin/recursos/noticias/save']);
  }

  view(noticia: Noticia) {
    this.dialogsService.showEventNewsDialog<Noticia>(AdminRecursosNoticiasViewComponent, noticia);
  }

  update(noticia: Noticia) {
    this.noticiasService.currentSaveNoticia = noticia;
    this.router.navigate(['/admin/recursos/noticias/save']);
  }

  delete(noticia: Noticia) {
    this.dialogsService.showDeleteConfirmDialog("el noticia", noticia.titulo)
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.noticiasService.delete(noticia.id)
            .subscribe(response => {
              this.loadData();
            }, error => {
              console.error("error", error);
            });
        }
      });
  }

}
