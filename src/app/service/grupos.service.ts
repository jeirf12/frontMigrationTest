import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Grupo } from '../model/entity/grupo';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private baseUrl = environment.baseUrl + "admin/grupos/";

  private saveGrupoSubject: BehaviorSubject<Grupo>;

  constructor(private http: HttpClient) {
    this.saveGrupoSubject = new BehaviorSubject<Grupo>(JSON.parse(localStorage.getItem('currentSaveGrupo')));
  }

  set currentSaveGrupo(grupo: Grupo) {
    localStorage.setItem('currentSaveGrupo', JSON.stringify(grupo));
    this.saveGrupoSubject.next(grupo);
  }

  get currentSaveGrupo(): Grupo {
    return this.saveGrupoSubject.value;
  }

  clearUpdateGrupo() {
    localStorage.removeItem('currentSaveGrupo');
    this.saveGrupoSubject.next(null);
  }

  getAll(): Observable<Grupo[]> {
    return this.http.get<ApiResponse<Grupo[]>>(this.baseUrl)
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

  save(grupo: Grupo, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(grupo);
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
