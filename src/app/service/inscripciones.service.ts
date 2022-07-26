import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { Inscripcion } from '../model/entity/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private baseUrl = environment.baseUrl + "admin/inscripciones/";

  constructor(private http: HttpClient) {
  }

  getInscripcion(month: number, year: number, grupoId: number): Observable<Inscripcion> {
    const httpParams: HttpParams = new HttpParams()
      .set("month", month.toString())
      .set("year", year.toString())
      .set("grupoId", grupoId.toString());
    return this.http.get<ApiResponse<Inscripcion>>(this.baseUrl + "get-by-fecha-and-grupo", { params: httpParams })
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

  save(inscripcion: Inscripcion, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(inscripcion);
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

}
