import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconDefinition, faMapMarkerAlt, faCalendarAlt, faTimes  } from '@fortawesome/free-solid-svg-icons';
import { Noticia } from 'src/app/model/entity/noticia';

@Component({
  selector: 'app-admin-recursos-noticias-view',
  templateUrl: './admin-recursos-noticias-view.component.html',
  styleUrls: ['./admin-recursos-noticias-view.component.scss']
})
export class AdminRecursosNoticiasViewComponent implements OnInit {

  @Input() item: Noticia;

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
