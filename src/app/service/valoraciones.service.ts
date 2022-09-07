import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Valoracion } from '../model/entity/valoracion';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { Deportista } from '../model/entity/deportista';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {

  private baseUrl = environment.baseUrl + "admin/valoraciones/";

  private saveValoracionSubject: BehaviorSubject<Valoracion>;
  private valoracionesDeportistaSubject: BehaviorSubject<Deportista>;

  constructor(private http: HttpClient) {
    this.saveValoracionSubject = new BehaviorSubject<Valoracion>(JSON.parse(localStorage.getItem('currentSaveValoracion')));
    this.valoracionesDeportistaSubject = new BehaviorSubject<Deportista>(JSON.parse(localStorage.getItem('currentDeportistaValoraciones')));
  }

  set currentSaveValoracion(valoracion: Valoracion) {
    localStorage.setItem('currentSaveValoracion', JSON.stringify(valoracion));
    this.saveValoracionSubject.next(valoracion);
  }

  get currentSaveValoracion(): Valoracion {
    return this.saveValoracionSubject.value;
  }

  clearUpdateValoracion() {
    localStorage.removeItem('currentSaveValoracion');
    this.saveValoracionSubject.next(null);
  }

  set currentDeportistaValoraciones(deportista: Deportista) {
    localStorage.setItem('currentDeportistaValoraciones', JSON.stringify(deportista));
    this.valoracionesDeportistaSubject.next(deportista);
  }

  get currentDeportistaValoraciones(): Deportista {
    return this.valoracionesDeportistaSubject.value;
  }

  clearDeportistaValoraciones() {
    localStorage.removeItem('currentDeportistaValoraciones');
    this.saveValoracionSubject.next(null);
  }

  getAll(deportistaId: number): Observable<Valoracion[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("deportistaId", deportistaId.toString());
    return this.http.get<ApiResponse<Valoracion[]>>(this.baseUrl, { params: httpParams })
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

  save(valoracion: Valoracion, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(valoracion);
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

  delete(id: number): Observable<string> {
    const httpParams: HttpParams = new HttpParams()
      .set("id", id.toString());
    return this.http.delete<ApiResponse<string>>(this.baseUrl, { params: httpParams })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getById(valoracionId: number): Observable<Valoracion> {
    const httpParams: HttpParams = new HttpParams()
      .set("valoracionId", valoracionId.toString());
    return this.http.get<ApiResponse<Valoracion>>(this.baseUrl + "get-by-id", { params: httpParams })
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
