import { Component, OnInit } from '@angular/core';
import { ValoracionesService } from 'src/app/service/valoraciones.service';
import { Valoracion } from 'src/app/model/entity/valoracion';
import { faEye, faEdit, faTrashAlt, faCopy, faFilePdf, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Deportista } from 'src/app/model/entity/deportista';
import { Medidas } from 'src/app/model/entity/medidas';
import { DateUtil } from 'src/app/util/date-util';
import { DialogsService } from 'src/app/service/dialogs.service';
import { PdfService } from 'src/app/service/pdf.service';
import { SimpleEnum } from 'src/app/model/enums/simple-enum';
import { EnumsService } from 'src/app/service/enums.service';
import { DeportistasService } from 'src/app/service/deportistas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-valoraciones',
  templateUrl: './admin-valoraciones.component.html',
  styleUrls: ['./admin-valoraciones.component.scss'],
  providers: [DatePipe]
})
export class AdminValoracionesComponent implements OnInit {

  faEye: IconDefinition = faEye;
  faEdit: IconDefinition = faEdit;
  faTrashAlt: IconDefinition = faTrashAlt;
  faFilePdf: IconDefinition = faFilePdf;
  faCompare: IconDefinition = faCopy;

  deportista: Deportista;
  medidas: Medidas;
  private valoracionesList: Valoracion[];
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 0;
  searchKey: string = "";

  tiposClasificacion: SimpleEnum[];

  constructor(
    private router: Router,
    private pdfService: PdfService,
    private dialogsService: DialogsService,
    private valoracionesService: ValoracionesService,
    private deportistasService: DeportistasService,
    private enumsService: EnumsService,
    public datepipe: DatePipe
  ) {
    this.deportista = this.valoracionesService.currentDeportistaValoraciones;
  }

  ngOnInit() {
    this.loadData();
    this.loadHelperData();
  }

  loadHelperData() {
    this.tiposClasificacion = this.enumsService.tiposClasificacion;
  }

  loadData() {
    this.valoracionesService.getAll(this.deportista.id)
      .subscribe(response => {
        this.valoracionesList = response;
        this.collectionSize = this.valoracionesList.length;
        if (this.collectionSize > 0) {
          this.medidas = this.valoracionesList[0].medidas;
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

  add() {
    this.valoracionesService.currentSaveValoracion = null;
    this.router.navigate(['/admin/deportistas/valoraciones/save']);
  }

  update(valoracion: Valoracion) {
    this.valoracionesService.currentSaveValoracion = valoracion;
    this.router.navigate(['/admin/deportistas/valoraciones/save']);
  }

  delete(valoracion: Valoracion) {
    let strDate = this.datepipe.transform(valoracion.fecha, 'dd-MMMM-yyyy');
    this.dialogsService.showDeleteConfirmDialog("la valoracion", strDate)
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this.valoracionesService.delete(valoracion.id)
            .subscribe(response => {
              this.loadData();
            }, error => {
              console.error("error", error);
            });
        }
      });
  }

  export(valoracion: Valoracion) {
    this.pdfService.getValoracionPdf(valoracion, this.deportista);
  }

  compare() {
    this.router.navigate(['/admin/deportistas/valoraciones/compare']);
  }

  get urlFoto(): string {
    return this.deportista.info.fotoPrefix + "," + this.deportista.info.foto;
  }

  get edadDeportista(): string {
    return DateUtil.getEdad(this.deportista.info.fechaNacimiento).toString();
  }

  onClasificacionChange() {
    this.deportistasService.save(this.deportista, false).subscribe(response => {
      if (response.success) {
        this.dialogsService.showToast(response.body, true);
      } else {
        this.dialogsService.showToast(response.body, false);
      }
    }, error => {
      console.error("error", error);
    });
  }

}
