import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Noticia } from '../model/entity/noticia';
import { ApiResponse } from '../model/response/api-response';
import { ApiRequest } from '../model/request/api-request';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private baseUrl = environment.baseUrl + "admin/noticias/";

  private saveNoticiaSubject: BehaviorSubject<Noticia>;

  constructor(private http: HttpClient) {
    this.saveNoticiaSubject = new BehaviorSubject<Noticia>(JSON.parse(localStorage.getItem('currentSaveNoticia')));
  }

  set currentSaveNoticia(noticia: Noticia) {
    localStorage.setItem('currentSaveNoticia', JSON.stringify(noticia));
    this.saveNoticiaSubject.next(noticia);
  }

  get currentSaveNoticia(): Noticia {
    return this.saveNoticiaSubject.value;
  }

  clearUpdateNoticia() {
    localStorage.removeItem('currentSaveNoticia');
    this.saveNoticiaSubject.next(null);
  }

  getAll(): Observable<Noticia[]> {
    return this.http.get<ApiResponse<Noticia[]>>(this.baseUrl)
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

  save(noticia: Noticia, isCreate: boolean): Observable<ApiResponse<string>> {
    const request = new ApiRequest(noticia);
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
