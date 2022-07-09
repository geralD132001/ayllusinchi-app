import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../utils/response";
import {EntityDataService} from "../utils/entity-data.service";
import {END_POINTS} from "../utils/end-point";
import { IAsistencia } from '../utils/response2';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaGetById2Service extends EntityDataService<IAsistencia>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient, END_POINTS.apiAsistenciaById);
  }

}
