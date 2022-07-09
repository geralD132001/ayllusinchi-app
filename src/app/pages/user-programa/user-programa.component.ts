import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../providers/services/programa.service';
import { ProyectoService } from '../../providers/services/proyecto.service';
import { FacultadService } from '../../providers/services/facultad.service';
import { TallerService } from '../../providers/services/taller.service';

@Component({
  selector: 'app-user-programa',
  templateUrl: './user-programa.component.html',
  styles: [],
})
export class UserProgramaComponent implements OnInit {
  
  facultades: any[] = [];
  proyectos: any[] = [];
  programas: any[] = [];

  talleres: any[] = [];


  constructor(
    private facultadService: FacultadService,
    private proyectoService: ProyectoService,
    private programaService: ProgramaService,
    private tallerService: TallerService
  ) {}

  ngOnInit(): void {
    this.getTalleres();
    this.getFacultades();
    this.getProyetos();
    this.getProgramas();
  }

  getFacultades(): void {
    this.facultadService.getAll$().subscribe((response) => {
      console.log(response);
      this.facultades = response.data || [];
    });
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      console.log(response);
      this.talleres = response.data || [];
    });
  }

  getProyetos(): void {
    this.proyectoService.getAll$().subscribe((response) => {
      console.log(response);
      this.proyectos = response.data || [];
    });
  }

  
  getProgramas(): void {
    this.programaService.getAll$().subscribe((response) => {
      console.log(response);
      this.programas = response.data || [];
    });
  }
}
