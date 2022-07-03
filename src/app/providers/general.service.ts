import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EntityDataService} from "./utils/entity-data.service";
import {IResponse} from "./utils/response";
import {END_POINTS} from "./utils/end-point";


@Injectable()
export class GeneralService extends EntityDataService<IResponse> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, END_POINTS.api);
  }

  public nameAll$(serviceName: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${serviceName}`);
  }
  public nameParams$(serviceName: any, params: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${serviceName}`, { params });
  }
  public nameId$(serviceName: any, id: any,): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${serviceName}/${id}`);
  }

  public addNameData$(serviceName: any, data: any): Observable<IResponse> {
    return this.httpClient.post<IResponse>(`${serviceName}`, data);
  }

  public deleteNameId$(serviceName: any, id: any): Observable<IResponse> {
    return this.httpClient.delete<IResponse>(`${serviceName}/${id}`);
  }

  public updateNameIdData$(serviceName: any, id: any, data: any): Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${serviceName}/${id}`, data);
  }
  public updateNameData$(serviceName: any, data: any): Observable<IResponse> {
    return this.httpClient.put<IResponse>(`${serviceName}`, data);
  }

}
