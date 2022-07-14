import { Component, Input, OnInit } from '@angular/core';
import { PersonaService } from '../../providers/services/persona.service';
import { TallerService } from '../../providers/services/taller.service';
import { ProgramaService } from '../../providers/services/programa.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaAddPersonaService } from '../../providers/services/asistencia-add-persona.service';

@Component({
  selector: 'app-user-asistencia-register-personas',
  templateUrl: './user-asistencia-register-personas.component.html',
  styles: [],
})
export class UserAsistenciaRegisterPersonasComponent implements OnInit {
  personas: any[] = [];
  talleres: any[] = [];
  programas: any[] = [];

  @Input() item: any;
  @Input() id_asistencia: any;
  @Input() title: any;
  idAsistencia: string;
  isUpdating: boolean;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private personaService: PersonaService,
    private asistenciaPersonaAddService: AsistenciaAddPersonaService,
    private tallerService: TallerService,
    private programaService: ProgramaService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getPersonas();
    this.getProgramas();
    this.getTalleres();
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_asistencia = '';
    }
    console.log(this.item);
  }

  private inicio(): any {
    const controls = {
      fecha: ['', [Validators.required]],
      rptadetalle: ['', [Validators.required]],
      rptaRegreso: ['', [Validators.required]],
      rptaInteresado: ['', [Validators.required]],
      idTaller: [''],
      idPersona: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      fecha: name.fecha,
      rptadetalle: name.rptadetalle,
      rptaRegreso: name.rptaRegreso,
      rptaInteresado: name.rptaInteresado,
      taller: {
        idTaller: name.idTaller,
      },
      persona: {
        idPersona: name.idPersona,
      },
    };

    this.asistenciaPersonaAddService.add$(save).subscribe(response => {
      if(response.success){
        this.activeModal.close({success: true, message: response.message});
      }
    }, () => {}, () => {});
  }

  update(name: any): void {
    if(this.formGroup.invalid){
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      idAsistencia: this.idAsistencia,
      fecha: name.fecha,
      rptadetalle: name.rptadetalle,
      rptaRegreso: name.rptaRegreso,
      rptaInteresado: name.rptaInteresado,
      taller: {
        idTaller: name.idTaller,
      },
      persona: {
        idPersona: name.idPersona,
      },
    }

    this.asistenciaPersonaAddService.update$(this.idAsistencia, save).subscribe(response => {
      if (response.success) {
        this.activeModal.close({ success: true, message: response.message });
      } else {
      }
    }, () => { }, () => {  });
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idAsistencia = data.idAsistencia;
    this.formGroup.patchValue({
      fecha: data.fecha,
      rptadetalle: data.rptadetalle,
      rptaRegreso: data.rptaRegreso,
      rptaInteresado: data.rptaInteresado,
      idTaller: data.idTaller,
      idPersona: data.idPersona
    });
  }

  public func() {
    this.activeModal.close();
  }

  validaForm(campo: string) {
    return this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched;
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe((response) => {
      this.personas = response.data || [];
    });
  }

  getProgramas(): void {
    this.programaService.getAll$().subscribe((response) => {
      this.programas = response.data || [];
    });
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      this.talleres = response.data || [];
    });
  }
}
