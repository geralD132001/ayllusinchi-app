import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../providers/services/asistencia.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: [
  ]
})
export class EstudianteComponent implements OnInit {

  asistencias: any[] = [];
  constructor(private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.getAsistencias();
  }

  getAsistencias(): void {
    this.asistenciaService.getAll$().subscribe(response => {
      console.log(response);
      this.asistencias = response.data || [];
    });
  }



}
