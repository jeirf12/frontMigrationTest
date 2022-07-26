import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { EnumsService } from 'src/app/service/enums.service';
import { PublicsService } from 'src/app/service/publics.service';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { Noticia } from 'src/app/model/entity/noticia';
import { Evento } from 'src/app/model/entity/evento';
import { DialogsService } from 'src/app/service/dialogs.service';
import { TipoUsuario } from 'src/app/model/enums/tipo-usuario';
import { Horario } from 'src/app/model/entity/horario';
import { AdminRecursosEventosViewComponent } from '../../admin/pages/admin-recursos/admin-recursos-eventos/admin-recursos-eventos-view/admin-recursos-eventos-view.component';
import { AdminRecursosNoticiasViewComponent } from '../../admin/pages/admin-recursos/admin-recursos-noticias/admin-recursos-noticias-view/admin-recursos-noticias-view.component';
import { AdminRecursosGruposHorarioComponent } from '../../admin/pages/admin-recursos/admin-recursos-grupos/admin-recursos-grupos-horario/admin-recursos-grupos-horario.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbTabsetConfig]
})
export class HomeComponent implements OnInit {

  private returnUrl: string;

  eventosList: Evento[] = [];
  noticiasList: Noticia[] = [];
  currentHorario: Horario[];

  constructor(
    private route: ActivatedRoute,
    private tabsetConfig: NgbTabsetConfig,
    private router: Router,
    private publicsService: PublicsService,
    private dialogsService: DialogsService,
    private authenticationService: AuthenticationService
  ) {
    tabsetConfig.justify = 'center'
    tabsetConfig.type = 'pills'
    if (this.authenticationService.currentUser) {
      const role = this.authenticationService.currentUser.role
      switch (role) {
        case TipoUsuario.SUPER.abreviatura:
        case TipoUsuario.ADMINISTRADOR.abreviatura:
          this.router.navigate(['/admin/dashboard']);
          break;
        case TipoUsuario.USUARIO.abreviatura:
          this.router.navigate(['/user/dashboard']);
          break;
      }
    }
  }

  ngOnInit() {
    this.loadData();
    this.publicsService.loadAll();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
  }

  loadData() {
    this.publicsService.getLastEventsAndNews().subscribe(response => {
      this.eventosList = response.first;
      this.noticiasList = response.second;
    }, error => {
      console.error("error", error);
    });
    this.publicsService.getCurrentHorario().subscribe(response => {
      this.currentHorario = response;
    }, error => {
      console.error("error", error);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  geturlImagen(item): string {
    return item.imagenPrefix + "," + item.imagen;
  }

  viewEvento(evento: Evento) {
    this.dialogsService.showEventNewsDialog<Evento>(AdminRecursosEventosViewComponent, evento);
  }

  viewNoticia(noticia: Noticia) {
    this.dialogsService.showEventNewsDialog<Noticia>(AdminRecursosNoticiasViewComponent, noticia);
  }

  showCurrentHorario() {
    this.dialogsService.showViewDialogWithDismiss<Horario[]>(AdminRecursosGruposHorarioComponent, this.currentHorario);
  }



}
