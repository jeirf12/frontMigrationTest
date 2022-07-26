import { Component, OnInit, Input } from '@angular/core';
import { Horario } from 'src/app/model/entity/horario';
import { HorarioUtil } from 'src/app/util/horario-util';
import { CurrentHorario } from 'src/app/model/entity/current-horario';

@Component({
  selector: 'app-admin-recursos-grupos-horario',
  templateUrl: './admin-recursos-grupos-horario.component.html',
  styleUrls: ['./admin-recursos-grupos-horario.component.scss']
})
export class AdminRecursosGruposHorarioComponent implements OnInit {

  @Input() item: Horario[];

  currentHorarioList: CurrentHorario[] = [];

  constructor() { }

  ngOnInit(): void {
    this.currentHorarioList = HorarioUtil.getCurrentHorario(this.item);
  }

  getHoraCompleta(hora: number): string {
    return HorarioUtil.getStringHour(hora);
  }

}
