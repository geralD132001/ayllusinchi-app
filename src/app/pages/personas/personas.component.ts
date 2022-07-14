import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../providers/services/persona.service';
import { AsistenciaPersonaService } from '../../providers/services/asistencia-persona.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: [
  ]
})
export class PersonasComponent implements OnInit {


  personas: any[] = [];
  asistencias: any[] = [];
  constructor(private personaService: PersonaService,
    private asistenciaPersonaService: AsistenciaPersonaService) { }

  ngOnInit(): void {
    this.getPersonas();
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

  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      console.log(response);
      this.personas = response.data || [];
    });
  }

  getAsistencias(): void {
    this.asistenciaPersonaService.getAll$().subscribe(response => {
      console.log(response);
      this.asistencias = response.data || [];
    });
  }



}
