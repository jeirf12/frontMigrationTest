import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { Deportista } from '../model/entity/deportista';
import { Usuario } from '../model/entity/usuario';

@Injectable({
  providedIn: 'root'
})
export class DeportistasService {

  private baseUrl = environment.baseUrl + "admin/deportistas/";

  private saveDeportistaSubject: BehaviorSubject<Deportista>;

  constructor(private http: HttpClient) {
    this.saveDeportistaSubject = new BehaviorSubject<Deportista>(JSON.parse(localStorage.getItem('currentSaveDeportista')));
  }

  set currentSaveDeportista(deportista: Deportista) {
    localStorage.setItem('currentSaveDeportista', JSON.stringify(deportista));
    this.saveDeportistaSubject.next(deportista);
  }

  get currentSaveDeportista(): Deportista {
    return this.saveDeportistaSubject.value;
  }

  clearSaveDeportista() {
    localStorage.removeItem('currentSaveDeportista');
    this.saveDeportistaSubject.next(null);
  }

  getAll(): Observable<Deportista[]> {
    return this.http.get<ApiResponse<Deportista[]>>(this.baseUrl)
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

  save(deportista: Deportista, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(deportista);
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

  getByDocumento(documento: string): Observable<Deportista> {
    const httpParams: HttpParams = new HttpParams()
      .set("documento", documento);
    return this.http.get<ApiResponse<Deportista>>(this.baseUrl + 'get-by-documento', { params: httpParams })
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

}
