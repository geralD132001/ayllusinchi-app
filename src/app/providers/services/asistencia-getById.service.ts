import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '../utils/response';
import { EntityDataService } from '../utils/entity-data.service';
import { END_POINTS } from '../utils/end-point';
import { Asistencia } from '../../pages/detalle-asistencia/asistencia';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaGetByIdService {
  private urlEndPoint: string = 'http://localhost:8901/ver';

  constructor(private http: HttpClient) {}

  getAsistenciaById(idAsistencia: number): Observable<Asistencia> {
    console.log(idAsistencia);
    
    return this.http.get<Asistencia>(`${this.urlEndPoint}/${idAsistencia}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }
}
