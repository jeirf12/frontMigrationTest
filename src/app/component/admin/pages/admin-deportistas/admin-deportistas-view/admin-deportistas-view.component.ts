import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumsService } from 'src/app/service/enums.service';
import { Enums } from 'src/app/model/Enums';
import { Deportista } from 'src/app/model/entity/deportista';

@Component({
  selector: 'app-admin-deportistas-view',
  templateUrl: './admin-deportistas-view.component.html',
  styleUrls: ['./admin-deportistas-view.component.scss']
})
export class AdminDeportistasViewComponent implements OnInit {

  @Input() item: Deportista;

  tipoDocumento: string = "";
  tipoGenero: string = "";
  tipoUsuario: string = "";

  constructor(
    public activeModal: NgbActiveModal,
    private enumsService: EnumsService
  ) {
  }

  ngOnInit() {
    this.loadEnums();
    if (this.item.patologias) {
      this.item.patologias = this.item.patologias.replace("|", "\n");
    }
  }

  loadEnums() {
    this.tipoDocumento = this.enumsService.enumDescription(this.item.info.tipoDocumento, Enums.tiposDocumento);
    this.tipoUsuario = this.enumsService.enumDescription(this.item.info.tipoUsuario, Enums.tiposUsuario);
    this.tipoGenero = this.enumsService.enumDescription(this.item.info.genero, Enums.tiposGenero);
  }

  get urlFoto(): string {
    return this.item.info.fotoPrefix + "," + this.item.info.foto;
  }

}
