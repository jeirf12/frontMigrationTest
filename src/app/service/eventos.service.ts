import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../model/entity/evento';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseUrl = environment.baseUrl + "admin/eventos/";

  private saveEventoSubject: BehaviorSubject<Evento>;

  constructor(private http: HttpClient) {
    this.saveEventoSubject = new BehaviorSubject<Evento>(JSON.parse(localStorage.getItem('currentSaveEvento')));
  }

  set currentSaveEvento(evento: Evento) {
    localStorage.setItem('currentSaveEvento', JSON.stringify(evento));
    this.saveEventoSubject.next(evento);
  }

  get currentSaveEvento(): Evento {
    return this.saveEventoSubject.value;
  }

  clearUpdateEvento() {
    localStorage.removeItem('currentSaveEvento');
    this.saveEventoSubject.next(null);
  }

  getAll(): Observable<Evento[]> {
    return this.http.get<ApiResponse<Evento[]>>(this.baseUrl)
      .pipe(
        map(response => {
          if (response.success) {
            return response.body
          } else {
            return [];
          }
        })
      );
  }

  save(evento: Evento, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(evento);
    if (isCreate) {
      return this.http.post<ApiResponse<string>>(this.baseUrl, request)
        .pipe(
          map(response => {
            return response
          })
        );
    } else {
      return this.http.put<ApiResponse<string>>(this.baseUrl, request)
        .pipe(
          map(response => {
            return response
          })
        );
    }

  }

  delete(id: number): Observable<ApiResponse<string>> {
    const httpParams: HttpParams = new HttpParams()
      .set("id", id.toString());
    return this.http.delete<ApiResponse<string>>(this.baseUrl, { params: httpParams })
      .pipe(
        map(response => {
          return response;
        })
      );
  }

}
