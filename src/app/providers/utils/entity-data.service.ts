import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

export class EntityDataService<T> {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    protected httpClient: HttpClient,
    protected endPoint: string,
  ) { }

  public getAll$(): Observable<T> {
    // const params = { all: 'true' };
    return this.httpClient.get<T>(this.endPoint);
  }

  public getWithQuery$(params: any): Observable<T> {
    return this.httpClient.get<T>(this.endPoint, { params: params });
  }

  public getById$(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.endPoint}/${id}/`);
  }

  public add$(entity: T): Observable<T> {
    return this.httpClient.post<T>(this.endPoint, entity);
  }

  public update$(id: string, entity: T): Observable<T> {
    return this.httpClient.put<T>(`${this.endPoint}/${id}/`, entity, {headers: this.httpHeaders});
  }

  public delete$(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}/${id}/`);
  }

}
