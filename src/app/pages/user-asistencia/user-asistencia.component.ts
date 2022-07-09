import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserAsistenciaRegisterComponent } from '../user-asistencia-register/user-asistencia-register.component';
import { TallerService } from '../../providers/services/taller.service';
import { UserAsistenciaRegisterPersonasComponent } from '../user-asistencia-register-personas/user-asistencia-register-personas.component';
import { AsistenciaService } from '../../providers/services/asistencia.service';
import { ActivatedRoute } from '@angular/router';
import { TallerGetByIdService } from '../../providers/services/taller-getById.service';

@Component({
  selector: 'app-user-asistencia',
  templateUrl: './user-asistencia.component.html',
  styles: [
  ]
})
export class UserAsistenciaComponent implements OnInit {

  idTaller: any = this.activatedRoute.snapshot.paramMap.get('id_taller');
  taller: any;
  talleres: any[] = [];
  asistencias: any[] = [];

  constructor(private tallerServiceById: TallerGetByIdService, private activatedRoute: ActivatedRoute, private modalService: NgbModal, private tallerService: TallerService, private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.getTaller();
    this.getTalleres();
    this.getAsistencias();
  }

  getTaller(): void {
    this.tallerServiceById.getById$(this.idTaller).subscribe(response => {
      console.log(response);
      this.taller = response.data || [];
    });
  }
  
  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      console.log(response);
      this.talleres = response.data || [];
    });
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

}
