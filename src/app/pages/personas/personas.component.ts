import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../providers/services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: [
  ]
})
export class PersonasComponent implements OnInit {


  personas: any[] = [];
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      console.log(response);
      this.personas = response.data || [];
    });
  }


}
