import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/model/entity/usuario';
import { EnumsService } from 'src/app/service/enums.service';
import { PublicsService } from 'src/app/service/publics.service';
import { Enums } from 'src/app/model/Enums';

@Component({
  selector: 'app-admin-instructores-view',
  templateUrl: './admin-instructores-view.component.html',
  styleUrls: ['./admin-instructores-view.component.scss']
})
export class AdminInstructoresViewComponent implements OnInit {

  @Input() item: Usuario;

  tipoDocumento: string = "";
  tipoGenero: string = "";
  tipoUsuario: string = "";

  constructor(
    public activeModal: NgbActiveModal,
    private enumsService: EnumsService
  ) { }

  ngOnInit() {
    this.loadEnums();
  }

  loadEnums() {
    this.tipoDocumento = this.enumsService.enumDescription(this.item.tipoDocumento, Enums.tiposDocumento);
    this.tipoUsuario = this.enumsService.enumDescription(this.item.tipoUsuario, Enums.tiposUsuario);
    this.tipoGenero = this.enumsService.enumDescription(this.item.genero, Enums.tiposGenero);
  }

  get urlFoto(): string {
    return this.item.fotoPrefix + "," + this.item.foto;
  }

}
