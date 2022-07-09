import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaService } from '../../providers/services/asistencia.service';
import { AsistenciaGetByIdService } from '../../providers/services/AsistenciaGetById.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: [],
})
export class EstudianteComponent implements OnInit {

  idAsistencia: any = this.activatedRoute.snapshot.paramMap.get('id_asistencia');
  asistencia: any;
  asistencias: any[] = [];

  constructor(
    private asistenciaServiceById: AsistenciaGetByIdService,
    private asistenciaService: AsistenciaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAsistencias();
    this.getAsistencia();
  }

  getAsistencia(): void {
    this.asistenciaServiceById.getById$(this.idAsistencia).subscribe((response) => {
      console.log(response);
      this.asistencia = response.data || [];
    });
  }

  getAsistencias(): void {
    this.asistenciaService.getAll$().subscribe((response) => {
      console.log(response);
      this.asistencias = response.data || [];
    });
  }
}
