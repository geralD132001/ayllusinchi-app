import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaGetIdService } from '../../providers/services/asistencia-getById.service';
import { Asistencia } from './asistencia';
import Swal from 'sweetalert2';
import { AsistenciaUploadService } from '../../providers/services/asistencia-upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-asistencia',
  templateUrl: './detalle-asistencia.component.html',
  styles: [],
})
export class DetalleAsistenciaComponent implements OnInit {
  @Input() asistencia: Asistencia;
  fotoSeleccionada: File;

  public previsualizacion: File;
  progreso: number = 0;
  public archivos: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private asistenciaByIdService: AsistenciaGetIdService,
    private asistenciaUploadService: AsistenciaUploadService,
    private sanitizer: DomSanitizer,
    private activeModal: NgbModal
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let idAsistencia: number = +params.get('idAsistencia');
      console.log(idAsistencia + ' PRUEBA');
      if (idAsistencia) {
        this.asistenciaByIdService
          .getAsistenciaById(idAsistencia)
          .subscribe((asistencia) => {
            this.asistencia = asistencia;
            console.log(this.asistencia);
          });
      }
    });
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
    this.archivos.push(archivoCapturado);
    // console.log(event.target.files);
  }

  /*subirArchivo(): any {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo, idAsistencia: any) => {
        formularioDeDatos.append('archivo', archivo);
        formularioDeDatos.append('idAsistencia', idAsistencia);
        console.log(archivo);
      });

      this.asistenciaUploadService
        .subirFoto(this.previsualizacion, formularioDeDatos)
        .subscribe((res: any) => {
          console.log('Respuesta del servidor', res);
        });
    } catch (e) {
      console.log('ERROR', e);
    }
  }
  */

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeimg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeimg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.asistenciaUploadService
        .subirFoto(this.fotoSeleccionada, this.asistencia?.idAsistencia)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.asistencia = response.asistencia as Asistencia;

            // this.asistenciaUploadService.notificarUpload.emit(this.cliente);
            Swal.fire(
              'La foto se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }
}
