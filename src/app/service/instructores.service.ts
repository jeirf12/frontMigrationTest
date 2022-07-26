import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';
import { Usuario } from '../model/entity/usuario';

@Injectable({
  providedIn: 'root'
})
export class InstructoresService {

  private baseUrl = environment.baseUrl + "super/instructores/";

  private saveInstructorSubject: BehaviorSubject<Usuario>;

  constructor(private http: HttpClient) {
    this.saveInstructorSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentSaveInstructor')));
  }

  set currentSaveInstructor(instructor: Usuario) {
    localStorage.setItem('currentSaveInstructor', JSON.stringify(instructor));
    this.saveInstructorSubject.next(instructor);
  }

  get currentSaveInstructor(): Usuario {
    return this.saveInstructorSubject.value;
  }

  clearSaveInstructor() {
    localStorage.removeItem('currentSaveInstructor');
    this.saveInstructorSubject.next(null);
  }

  getAll(includeSuper: boolean): Observable<Usuario[]> {
    const httpParams: HttpParams = new HttpParams()
      .set("includeSuper", includeSuper.toString());
    return this.http.get<ApiResponse<Usuario[]>>(this.baseUrl, { params: httpParams })
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

  getById(id: number): Observable<Usuario> {
    const httpParams: HttpParams = new HttpParams()
      .set("id", id.toString());
    return this.http.get<ApiResponse<Usuario>>(this.baseUrl + 'get-by-id', { params: httpParams })
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

  save(usuario: Usuario, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(usuario);
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
