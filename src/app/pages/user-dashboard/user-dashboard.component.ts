import { Component, OnInit } from '@angular/core';
import { ProyectoService } from 'src/app/providers/services/proyecto.service';
import { FacultadService } from '../../providers/services/facultad.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styles: [],
})
export class UserDashboardComponent implements OnInit {
  
  facultades: any[] = [];
  proyectos: any[] = [];
  constructor(
    private facultadService: FacultadService,
    private proyectoService: ProyectoService
  ) {}

  ngOnInit(): void {
    this.getFacultades();
    this.getProyetos();
  }

  getFacultades(): void {
    this.facultadService.getAll$().subscribe((response) => {
      console.log(response);
      this.facultades = response.data || [];
    });
  }
  
  getProyetos(): void {
    this.proyectoService.getAll$().subscribe((response) => {
      console.log(response);
      this.proyectos = response.data || [];
    });
  }
}
