import { Component, OnInit, Input } from '@angular/core';
import { Grupo } from 'src/app/model/entity/grupo';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Horario } from 'src/app/model/entity/horario';
import { HorarioUtil } from 'src/app/util/horario-util';

@Component({
  selector: 'app-admin-recursos-grupos-view',
  templateUrl: './admin-recursos-grupos-view.component.html',
  styleUrls: ['./admin-recursos-grupos-view.component.scss']
})
export class AdminRecursosGruposViewComponent implements OnInit {

  @Input() item: Grupo;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  getHorarioCompleto(horario: Horario): string {
    return HorarioUtil.getHorarioCompleto(horario);
  }

}
