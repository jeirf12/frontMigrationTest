import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { TwoObjects } from '../model/two-objects';
import { DataReporte } from '../model/data-reporte';
import { ReporteGeneral } from '../model/reporte-general';
import { FiltroReporteRequest } from '../model/request/filtro-reporte-request';
import { ReporteAnualAsistencia } from '../model/entity/reporte-anual-asistencia';
import { ReporteMensualAsistencia } from '../model/entity/reporte-mensual-asistencia';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = environment.baseUrl + "admin/reportes/";

  constructor(private http: HttpClient) {
  }

  getGeneral(filter: TwoObjects<Date, Date>): Observable<ReporteGeneral> {
    const request = new ApiRequest(filter);
    return this.http.post<ApiResponse<ReporteGeneral>>(this.baseUrl + "get-general", request)
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

  getEspecifico(filter: FiltroReporteRequest): Observable<DataReporte> {
    const request = new ApiRequest(filter);
    return this.http.post<ApiResponse<DataReporte>>(this.baseUrl + "get-especifico", request)
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

  getReporteAnualAsistencia(anio: number, grupoId: number, dependenciaId: number, programaId: number): Observable<ReporteAnualAsistencia[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("anio", anio.toString())
      .set("grupoId", grupoId.toString())
      .set("dependenciaId", dependenciaId.toString())
      .set("programaId", programaId.toString());
    return this.http.get<ApiResponse<ReporteAnualAsistencia[]>>(this.baseUrl + "reporte-anual-asistencia", { params: httpParams })
      .pipe(
        map(response => {
          if (response.success) {
            return response.body;
          } else {
            return [];
          }

        })
      );
  }

  getReporteAnualAsistenciaFile(anio: number, grupoId: number, dependenciaId: number, programaId: number): Observable<Blob> {
    const httpParams: HttpParams = new HttpParams()
      .set("anio", anio.toString())
      .set("grupoId", grupoId.toString())
      .set("dependenciaId", dependenciaId.toString())
      .set("programaId", programaId.toString());
    return this.http.get(this.baseUrl + "reporte-anual-asistencia-file", { responseType: 'blob', params: httpParams })
      .pipe(
        map(response => {
          if (response.size > 100) {
            return response;
          } else {
            return null;
          }
        })
      );
  }

  getReporteSemestralAsistenciaFile(anio: number, semestre: number, grupoId: number, dependenciaId: number, programaId: number): Observable<Blob> {
    const httpParams: HttpParams = new HttpParams()
      .set("anio", anio.toString())
      .set("grupoId", grupoId.toString())
      .set("semestre", semestre.toString())
      .set("dependenciaId", dependenciaId.toString())
      .set("programaId", programaId.toString());
    return this.http.get(this.baseUrl + "reporte-semestral-asistencia-file", { responseType: 'blob', params: httpParams })
      .pipe(
        map(response => {
          if (response.size > 100) {
            return response;
          } else {
            return null;
          }
        })
      );
  }

  getReporteMensualAsistencia(anio: number, mes: number, grupoId: number, dependenciaId: number, programaId: number): Observable<ReporteMensualAsistencia[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("anio", anio.toString())
      .set("mes", mes.toString())
      .set("grupoId", grupoId.toString())
      .set("dependenciaId", dependenciaId.toString())
      .set("programaId", programaId.toString());
    return this.http.get<ApiResponse<ReporteMensualAsistencia[]>>(this.baseUrl + "reporte-mensual-asistencia", { params: httpParams })
      .pipe(
        map(response => {
          if (response.success) {
            return response.body;
          } else {
            return [];
          }

        })
      );
  }

  getReporteMensualAsistenciaFile(anio: number, mes: number, grupoId: number, dependenciaId: number, programaId: number): Observable<Blob> {
    const httpParams: HttpParams = new HttpParams()
      .set("anio", anio.toString())
      .set("mes", mes.toString())
      .set("grupoId", grupoId.toString())
      .set("dependenciaId", dependenciaId.toString())
      .set("programaId", programaId.toString());
    return this.http.get(this.baseUrl + "reporte-mensual-asistencia-file", { responseType: 'blob', params: httpParams })
      .pipe(
        map(response => {
          if (response.size > 100) {
            return response;
          } else {
            return null;
          }
        })
      );
  }

}
