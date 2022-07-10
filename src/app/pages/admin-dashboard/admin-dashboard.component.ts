import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../providers/services/programa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TallerService } from '../../providers/services/taller.service';
import { FacultadService } from '../../providers/services/facultad.service';
import { TallerComponent } from '../taller/taller.component';
import Swal from 'sweetalert2';
import { TallerDeleteService } from '../../providers/services/taller-delete.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styles: [],
})
export class AdminDashboardComponent implements OnInit {
  
  programas: any[] = [];
  talleres: any[] = [];
  facultades: any[] = [];
  

  constructor(
    private programaService: ProgramaService,
    private tallerService: TallerService,
    private tallerServiceDelete: TallerDeleteService, 
    private facultadService: FacultadService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getProgramas();
    this.getTalleres();
    this.getFacultades();
  }

  getFacultades(): void {
    this.facultadService.getAll$().subscribe(response => {
      console.log(response);
      this.facultades = response.data || [];
    });
  }


  getProgramas(): void {
    this.programaService.getAll$().subscribe(response => {
      console.log(response);
      this.programas = response.data || [];
    });
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe(response => {
      console.log(response);
      this.talleres = response.data || [];
    });
  }


  openModal(): any {
    const modal = this.modalService.open(TallerComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.title = 'Nuevo';
    modal.result.then(res => {
      if (res.success) {
        // @ts-ignore
        Swal.fire({
          title: 'Taller',
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

  openModalEdit(item: any): any {
    const modal = this.modalService.open(TallerComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static'
    });
    modal.componentInstance.id_taller = item.id_taller;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result.then(res => {
      if (res.success) {
        this.getTalleres();
        Swal.fire({
          title: 'Taller',
          text: `${res.message}`,
          icon: 'success',
          confirmButtonColor: '#7f264a',
          timer: 1500
        });
      }
    }).catch(res => {
    });
  }

  public onDelete(item: any): void {
    const ID = item.idTaller;
    const mensaje = '¿ Desea eliminar? : ' + ' ' + item.nombre;
    if (ID) {
      Swal.fire({
        title: 'Se eliminará el registro',
        text: `${mensaje}`,
        backdrop: true,
        //animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Estoy de acuerdo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.tallerServiceDelete.delete$(ID).subscribe(data => {
            if (data.success) {
              Swal.fire({
                title: 'Eliminado',
                text: data.message,
                backdrop: true,
                //animation: true,
                showConfirmButton: false,
                confirmButtonColor: '#7f264a',
                timer: 1500,
              });
              this.getTalleres();
            }
          });
        }
      });
    }
  }

  
}
