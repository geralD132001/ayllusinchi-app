import { Component, OnInit } from '@angular/core';
import { FacultadService } from '../../providers/services/facultad.service';
import { CarreraService } from '../../providers/services/carrera.service';
import { CicloService } from '../../providers/services/ciclo.service';
import { EstudianteService } from '../../providers/services/estudiante.service';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: [
  ]
})
export class EstudiantesComponent implements OnInit {

  facultades: any[] = [];
  carreras: any[] = [];
  ciclos: any[] = [];
  estudiantes: any[] = [];

  constructor(private facultadService: FacultadService,
    private carreraService: CarreraService,
    private cicloService: CicloService,
    private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.getFacultades();
    this.getCarreras();
    this.getCiclos();
    this.getEstudiantes();
  }

  getFacultades(): void {
    this.facultadService.getAll$().subscribe(response => {
      console.log(response);
      this.facultades = response.data || [];
    });
  }

  getCarreras(): void {
    this.carreraService.getAll$().subscribe(response => {
      console.log(response);
      this.carreras = response.data || [];
    });
  }

  getCiclos(): void {
    this.cicloService.getAll$().subscribe(response => {
      console.log(response);
      this.ciclos = response.data || [];
    });
  }

  getEstudiantes(): void {
    this.estudianteService.getAll$().subscribe(response => {
      console.log(response);
      this.estudiantes = response.data || [];
    });
  }


}
