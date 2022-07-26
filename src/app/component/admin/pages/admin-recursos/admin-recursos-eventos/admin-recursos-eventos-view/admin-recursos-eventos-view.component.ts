import { Component, OnInit, Input } from '@angular/core';
import { Evento } from 'src/app/model/entity/evento';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDefinition, faMapMarkerAlt, faCalendarAlt, faTimes  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-recursos-eventos-view',
  templateUrl: './admin-recursos-eventos-view.component.html',
  styleUrls: ['./admin-recursos-eventos-view.component.scss']
})
export class AdminRecursosEventosViewComponent implements OnInit {

  @Input() item: Evento;

  faMapMarkerAlt: IconDefinition = faMapMarkerAlt;
  faCalendarAlt: IconDefinition = faCalendarAlt;
  faTimes: IconDefinition = faTimes;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  get urlImagen(): string {
    return this.item.imagenPrefix + "," + this.item.imagen;
  }

}
