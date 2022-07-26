import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { Asistencia } from '../model/entity/asistencia';
import { TwoObjects } from '../model/two-objects';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private baseUrl = environment.baseUrl + "admin/asistencia/";

  constructor(private http: HttpClient) {
  }

  getAsistencia(asistencia: TwoObjects<Date, number>): Observable<Asistencia> {
    const request  = new ApiRequest(asistencia);    
    return this.http.post<ApiResponse<Asistencia>>(this.baseUrl + "get-by-fecha-and-inscripcion", request)
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

  save(asistencia: Asistencia, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(asistencia);
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
