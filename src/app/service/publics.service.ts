import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { Dependencia } from '../model/entity/dependencia';
import { TwoObjects } from '../model/two-objects';
import { Noticia } from '../model/entity/noticia';
import { Evento } from '../model/entity/evento';
import { Horario } from '../model/entity/horario';

@Injectable({
  providedIn: 'root'
})
export class PublicsService {

  private baseUrl = environment.baseUrl + "public/";

  private dependenciasSubject: BehaviorSubject<Dependencia[]>;

  constructor(private http: HttpClient) {
    this.dependenciasSubject = new BehaviorSubject<Dependencia[]>(JSON.parse(localStorage.getItem('dependencias')));
  }

  loadAll() {
    this.getDependencias();
  }

  set dependencias(dependencias: Dependencia[]) {
    localStorage.setItem('dependencias', JSON.stringify(dependencias));
    this.dependenciasSubject.next(dependencias);
  }

  get dependencias(): Dependencia[] {
    if (this.dependenciasSubject.value) {
      return this.dependenciasSubject.value;
    } else {
      return [];
    }
  }

  getDependencias() {
    return this.http.get<ApiResponse<Dependencia[]>>(this.baseUrl + "get-unidades-academicas")
      .pipe(
        map(response => {
          if (response.success) {
            console.log("res", response);
            return response.body
          } else {
            return [];
          }
        })
      ).subscribe(response => {
        this.dependencias = response;
      });
  }


  getDependenciaById(id: number): Dependencia {
    const unidadAcademica = this.dependencias.find(ua => ua.id == id)
    if (unidadAcademica) {
      return unidadAcademica;
    } else {
      return null;
    }
  }

  getLastEventsAndNews(): Observable<TwoObjects<Evento[], Noticia[]>> {
    return this.http.get<ApiResponse<TwoObjects<Evento[], Noticia[]>>>(this.baseUrl + "get-last-events-and-news")
      .pipe(
        map(response => {
          if (response.success) {
            return response.body
          } else {
            const result = new TwoObjects<Evento[], Noticia[]>();
            result.first = [];
            result.second = []
            return result;
          }
        })
      );
  }

  getCurrentHorario(): Observable<Horario[]> {
    return this.http.get<ApiResponse<Horario[]>>(this.baseUrl + "get-current-horario")
      .pipe(
        map(response => {
          if (response.success) {
            return response.body
          } else {
            return null;
          }
        })
      );
  }

}
