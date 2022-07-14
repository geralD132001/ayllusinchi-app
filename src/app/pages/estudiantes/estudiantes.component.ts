import { Component, OnInit } from '@angular/core';
import { FacultadService } from '../../providers/services/facultad.service';
import { CarreraService } from '../../providers/services/carrera.service';
import { CicloService } from '../../providers/services/ciclo.service';
import { EstudianteService } from '../../providers/services/estudiante.service';
import { AsistenciaService } from '../../providers/services/asistencia.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  facultades: any[] = [];
  carreras: any[] = [];
  ciclos: any[] = [];
  estudiantes: any[] = [];
  asistencias: any[] = [];

  constructor(private facultadService: FacultadService,
    private carreraService: CarreraService,
    private cicloService: CicloService,
    private estudianteService: EstudianteService,
    private asistenciaService: AsistenciaService) { }


  ngOnInit(): void {
    this.getFacultades();
    this.getCarreras();
    this.getCiclos();
    this.getEstudiantes();
    this.getAsistencias();
  }

  name = 'AylluSinchiAsistencia.xlsx';

  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
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

  getAsistencias(): void {
    this.asistenciaService.getAll$().subscribe(response => {
      console.log(response);
      this.asistencias = response.data || [];
    });
  }



}
