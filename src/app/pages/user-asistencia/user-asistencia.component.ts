import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserAsistenciaRegisterComponent } from '../user-asistencia-register/user-asistencia-register.component';
import { TallerService } from '../../providers/services/taller.service';
import { UserAsistenciaRegisterPersonasComponent } from '../user-asistencia-register-personas/user-asistencia-register-personas.component';
import { AsistenciaService } from '../../providers/services/asistencia.service';

@Component({
  selector: 'app-user-asistencia',
  templateUrl: './user-asistencia.component.html',
  styles: [
  ]
})
export class UserAsistenciaComponent implements OnInit {

  talleres: any[] = [];
  asistencias: any[] = [];

  constructor(private modalService: NgbModal, private tallerService: TallerService, private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.getTalleres();
    this.getAsistencias();
  }

  getAsistencias(): void {
    this.asistenciaService.getAll$().subscribe(response => {
      console.log(response);
      this.asistencias = response.data || [];
    });
  }


  openModal(): any {
    const modal = this.modalService.open(UserAsistenciaRegisterComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Asistencia',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getTalleres();
      }
    }).catch(res => {
    });
  }

  openModal2(): any {
    const modal = this.modalService.open(UserAsistenciaRegisterPersonasComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        Swal.fire({
          title: 'Asistencia',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
        this.getTalleres();
      }
    }).catch(res => {
    });
  }
  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      console.log(response);
      this.talleres = response.data || [];
    });
  }

}
