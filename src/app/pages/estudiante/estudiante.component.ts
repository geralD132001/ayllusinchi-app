import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
  public savePDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('ayllusinchi-estudiante-reporte.pdf');
    });
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
