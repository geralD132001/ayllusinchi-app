import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '../utils/response';
import { EntityDataService } from '../utils/entity-data.service';
import { END_POINTS } from '../utils/end-point';
import { Asistencia } from '../../pages/detalle-asistencia/asistencia';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaUploadService {
  private urlEndPoint: string = 'http://localhost:8901';

  constructor(private http: HttpClient) {}

  subirFoto(archivo: File, idAsistencia: any): Observable<Asistencia> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('idAsistencia', idAsistencia);
    console.log(idAsistencia);

    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response: any) => response.asistencia as Asistencia),
      catchError((e) => {
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );

    //const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
    //  reportProgress: true
    // });

    // return this.http.request(req);
  }
}
