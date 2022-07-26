import { Component, OnInit } from '@angular/core';
import { Valoracion } from 'src/app/model/entity/valoracion';
import { faEye, faEdit, faTrashAlt, faCopy, faFilePdf, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PublicsService } from 'src/app/service/publics.service';
import { Dependencia } from 'src/app/model/entity/dependencia';
import { Deportista } from 'src/app/model/entity/deportista';
import { Medidas } from 'src/app/model/entity/medidas';
import { DateUtil } from 'src/app/util/date-util';
import { DialogsService } from 'src/app/service/dialogs.service';
import { PdfService } from 'src/app/service/pdf.service';
import { UserDeportistaService } from 'src/app/service/user-deportista.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;
  faFilePdf: IconDefinition = faFilePdf;
  faCompare: IconDefinition = faCopy;

  deportista: Deportista;
  medidasActuales: Medidas;
  medidasAnteriores: Medidas;
  private valoracionesList: Valoracion[];
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0;
  searchKey: string = "";

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private dialogsService: DialogsService,
    private authenticationService: AuthenticationService,
    private userDeportistaService: UserDeportistaService,
  ) {
    this.userDeportistaService.getDeportistaById(this.authenticationService.currentUser.id).subscribe(response => {
      this.deportista = response;
      this.loadData();
    }, error => {
      console.error("error", error);
    });
  }

  ngOnInit() {

  }


  loadData() {
    this.userDeportistaService.getAllValoraciones(this.deportista.id)
      .subscribe(response => {
        this.valoracionesList = response;
        this.collectionSize = this.valoracionesList.length;
        if (this.collectionSize > 0) {
          this.medidasActuales = this.valoracionesList[0].medidas;
        }
        if (this.collectionSize > 1) {
          this.medidasAnteriores = this.valoracionesList[1].medidas;
        }
      }, error => {
        console.error("error", error);
      });
  }

  get valoraciones(): Valoracion[] {
    if (this.valoracionesList) {
      return this.valoracionesList
        .filter(valoracion => valoracion)
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)
    } else {
      return [];
    }
  }

  export(valoracion: Valoracion) {
    this.pdfService.getValoracionPdf(valoracion, this.deportista);
  }

  compare() {
    this.router.navigate(['/user/dashboard/valoraciones/compare']);
  }

  get urlFoto(): string {
    return this.deportista.info.fotoPrefix + "," + this.deportista.info.foto;
  }

  get edadDeportista(): string {
    return DateUtil.getEdad(this.deportista.info.fechaNacimiento).toString();
  }

}
