import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../providers/services/proyecto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoComponent } from '../proyecto/proyecto.component';
import Swal from 'sweetalert2';
import { ProyectoDeleteService } from '../../providers/services/proyecto-delete.service';

@Component({
  selector: 'app-list-proyectos',
  templateUrl: './list-proyectos.component.html',
  styles: [],
})
export class ListProyectosComponent implements OnInit {
  proyectos: any[] = [];
  constructor(
    private proyectoService: ProyectoService,
    private modalService: NgbModal,
    private proyectoServiceDelete: ProyectoDeleteService
  ) {}

  ngOnInit(): void {
    this.getProyetos();
  }

  getProyetos(): void {
    this.proyectoService.getAll$().subscribe((response) => {
      console.log(response);
      this.proyectos = response.data || [];
    });
  }

  openModal(): any {
    const modal = this.modalService.open(ProyectoComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static',
    });
    modal.componentInstance.title = 'Guardar';
    modal.result
      .then((res) => {
        if (res.success) {
          Swal.fire({
            title: 'Proyecto',
            text: `${res.message}`,
            icon: 'success',
            confirmButtonColor: '#7f264a',
            timer: 1500,
          });
          this.getProyetos();
        }
      })
      .catch((res) => {});
  }

  openModalEdit(item: any): any {
    const modal = this.modalService.open(ProyectoComponent, {
      size: 'lg',
      keyboard: false,
      backdrop: 'static',
    });
    modal.componentInstance.id_proyecto = item.id_proyecto;
    modal.componentInstance.item = item;
    modal.componentInstance.title = 'Modificar';
    modal.result
      .then((res) => {
        if (res.success) {
          this.getProyetos();
          Swal.fire({
            title: 'Proyecto',
            text: `${res.message}`,
            icon: 'success',
            confirmButtonColor: '#7f264a',
            timer: 1500,
          });
        }
      })
      .catch((res) => {});
  }

  public onDelete(item: any): void {
    const ID = item.idProyecto;
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
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.proyectoServiceDelete.delete$(ID).subscribe((data) => {
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
              this.getProyetos();
            }
          });
        }
      });
    }
  }
}
