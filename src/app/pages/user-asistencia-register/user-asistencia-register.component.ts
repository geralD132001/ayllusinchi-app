import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaAddService } from '../../providers/services/asistencia-add.service';
import { AsistenciaService } from '../../providers/services/asistencia.service';
import { ProgramaService } from '../../providers/services/programa.service';
import { TallerService } from '../../providers/services/taller.service';
import { EstudianteService } from '../../providers/services/estudiante.service';
import { CursoService } from '../../providers/services/curso.service';
import { ActivatedRoute } from '@angular/router';
import { AsistenciaGetByIdService } from '../../providers/services/AsistenciaGetById.service';

@Component({
  selector: 'app-user-asistencia-register',
  templateUrl: './user-asistencia-register.component.html',
  styles: [],
})
export class UserAsistenciaRegisterComponent implements OnInit {
  
  asistencia2: any;
  idAsistencia2: any = this.activatedRoute.snapshot.paramMap.get('id_asistencia');
  
  programas: any[] = [];
  talleres: any[] = [];
  asistencias: any[] = [];
  asistencia: any[] = [];
  estudiantes: any[] = [];
  cursos: any[] = [];
  @Input() item: any;
  @Input() id_asistencia: any;
  @Input() title: any;
  idAsistencia: string;
  isUpdating: boolean;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private asistenciaByIdService: AsistenciaGetByIdService,
    private asistenciaAddService: AsistenciaAddService,
    private asistenciaService: AsistenciaService,
    private programaService: ProgramaService,
    private tallerService: TallerService, 
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAsistencias();
    this.getAsitencia();
    this.getProgramas();
    this.getEstudiantes()
    this.getTalleres();
    this.getCursos();
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

  getCursos(): void {
    this.cursoService.getAll$().subscribe((response) => {
      console.log(response);
      this.cursos = response.data || [];
    });
  }

  
  getAsitencia(): void {
    this.asistenciaByIdService.getById$(this.idAsistencia).subscribe(response => {
      console.log(response);
      this.asistencia = response.data || [];
    });
  }

  
  getEstudiantes(): void {
    this.estudianteService.getAll$().subscribe((response) => {
      console.log(response);
      this.estudiantes = response.data || [];
    });
  }


  getProgramas(): void {
    this.programaService.getAll$().subscribe((response) => {
      console.log(response);
      this.programas = response.data || [];
    });
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      console.log(response);
      this.talleres = response.data || [];
    });
  }


  
  getAsistencias(): void {
    this.asistenciaService.getAll$().subscribe(response => {
      console.log(response);
      this.asistencias = response.data || [];
    });
  }


  private inicio(): any {
    const controls = {
      fecha: ['', [Validators.required]],
      evidencia: [''],
      rptadetalle: ['', [Validators.required]],
      rptaRelacion: ['', [Validators.required]],
      rptaNecesidad: ['', [Validators.required]],
      rptaRegreso: ['', [Validators.required]],
      rptaInteresado: ['', [Validators.required]],
      idTaller: [''],
      idEstudiante: [''],
      idCurso: ['']
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
      evidencia: name.evidencia,
      rptadetalle: name.rptadetalle,
      rptaRelacion: name.rptaRelacion,
      rptaNecesidad: name.rptaNecesidad,
      rptaRegreso: name.rptaRegreso,
      rptaInteresado: name.rptaInteresado,
      taller: {
        idTaller: name.idTaller
      },
      estudiante: {
        idEstudiante: name.idEstudiante
      },
      curso: {
        idCurso: name.idCurso
      }
    };
    this.asistenciaAddService.add$(save).subscribe(
      (response) => {
        if (response.success) {
          this.activeModal.close({ success: true, message: response.message });
        } else {
        }
      },
      () => {},
      () => {}
    );
  }

  update(name: any): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    // this.formGroup.reset();
    const save: any = {
      idAsistencia: this.idAsistencia,
      fecha: name.fecha,
      evidencia: name.evidencia,
      rptadetalle: name.rptadetalle,
      rptaRelacion: name.rptaRelacion,
      rptaNecesidad: name.rptaNecesidad,
      rptaRegreso: name.rptaRegreso,
      rptaInteresado: name.rptaInteresado,
      taller: {
        idTaller: name.idTaller
      },
      estudiante: {
        idEstudiante: name.idEstudiante
      },
      curso: {
        idCurso: name.idCurso
      }
    };
    this.asistenciaAddService.update$(this.idAsistencia, save).subscribe(
      (response) => {
        if (response.success) {
          this.activeModal.close({ success: true, message: response.message });
        } else {
        }
      },
      () => {},
      () => {}
    );
  }

  updateData(): any {
    const data = this.item;
    this.isUpdating = true;
    this.idAsistencia = data.idAsistencia;
    this.formGroup.patchValue({
      fecha: data.fecha,
      evidencia: data.evidencia,
      rptadetalle: data.rptadetalle,
      rptaRelacion: data.rptaRelacion,
      rptaNecesidad: data.rptaNecesidad,
      rptaRegreso: data.rptaRegreso,
      rptaInteresado: data.rptaInteresado,
      idTaller: data.idTaller,
      idEstudiante: data.idEstudiante,
      idCurso: data.idCurso
    });
  }

  public func() {
    this.activeModal.close();
  }

  validaForm(campo: string) {
    return (
      this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched
    );
  }
}
