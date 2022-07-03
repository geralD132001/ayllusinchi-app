import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../utils/response";
import {EntityDataService} from "../utils/entity-data.service";
import {END_POINTS} from "../utils/end-point";

@Injectable({
  providedIn: 'root'
})
export class CicloService extends EntityDataService<IResponse>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient, END_POINTS.apiCicloList);
  }

}
