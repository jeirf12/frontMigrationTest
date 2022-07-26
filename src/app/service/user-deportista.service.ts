import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { Deportista } from '../model/entity/deportista';
import { Valoracion } from '../model/entity/valoracion';
import { Inscripcion } from '../model/entity/inscripcion';
import { Asistencia } from '../model/entity/asistencia';

@Injectable({
  providedIn: 'root'
})
export class UserDeportistaService {

  private baseUrl = environment.baseUrl + "user/";

  constructor(private http: HttpClient) {
  }

  getDeportistaById(id: number): Observable<Deportista> {
    const httpParams: HttpParams = new HttpParams()
      .set("id", id.toString());
    return this.http.get<ApiResponse<Deportista>>(this.baseUrl + 'deportistas/get-by-id', { params: httpParams })
      .pipe(
        map(response => {
          if (response.success) {
            return response.body
          } else {
            return;
          }
        })
      );
  }

  getDeportistaByDocumento(documento: string): Observable<Deportista> {
    const httpParams: HttpParams = new HttpParams()
      .set("documento", documento);
    return this.http.get<ApiResponse<Deportista>>(this.baseUrl + 'deportistas/get-by-documento', { params: httpParams })
      .pipe(
        map(response => {
          if (response.success) {
            return response.body;
          } else {
            return null;
          }
        })
      );
  }

  saveProfile(deportista: Deportista): Observable<ApiResponse<string>> {
    const request = new ApiRequest(deportista);
    return this.http.put<ApiResponse<string>>(this.baseUrl + 'deportistas', request)
      .pipe(
        map(response => {
          return response
        })
      );
  }

  getAllValoraciones(deportistaId: number): Observable<Valoracion[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("deportistaId", deportistaId.toString());
    return this.http.get<ApiResponse<Valoracion[]>>(this.baseUrl + 'valoraciones', { params: httpParams })
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

  getValoracionById(valoracionId: number): Observable<Valoracion> {
    const httpParams: HttpParams = new HttpParams()
      .set("valoracionId", valoracionId.toString());
    return this.http.get<ApiResponse<Valoracion>>(this.baseUrl + "valoraciones/get-by-id", { params: httpParams })
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

  getInscripcionesByDeportista(deportistaId: number): Observable<Inscripcion[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("deportistaId", deportistaId.toString());
    return this.http.get<ApiResponse<Inscripcion[]>>(this.baseUrl + "inscripciones/get-by-deportista", { params: httpParams })
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

  getAsistenciaByDeportista(deportistaId: number): Observable<Asistencia[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("deportistaId", deportistaId.toString());
    return this.http.get<ApiResponse<Asistencia[]>>(this.baseUrl + "asistencia/get-by-deportista", { params: httpParams })
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

}
