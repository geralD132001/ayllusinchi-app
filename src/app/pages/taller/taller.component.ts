import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProgramaTallerEditService } from 'src/app/providers/services/programa-taller.edit.service';
import { ProgramaTallerAddService } from '../../providers/services/programa-taller-add.service';
import { ProgramaService } from '../../providers/services/programa.service';
import { TallerService } from '../../providers/services/taller.service';
import { CarreraService } from '../../providers/services/carrera.service';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styles: [],
})
export class TallerComponent implements OnInit {
  
  taller: any[] = [];
  programas: any[] = [];
  carreras: any[] = [];
  @Input() item: any;
  @Input() id_taller: any;
  @Input() title: any;
  idTaller: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private tallerServiceAdd: ProgramaTallerAddService,
    private tallerServieEdit: ProgramaTallerEditService,
    private programaService: ProgramaService,
    private carreraService: CarreraService
  ) {}

  ngOnInit(): void {
    this.getProgramas();
    this.getCarreras();
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_taller = '';
    }
    console.log(this.item);
  }

  getProgramas(): void {
    this.programaService.getAll$().subscribe((response) => {
      this.programas = response.data || [];
    });
  }

  getCarreras(): void {
    this.carreraService.getAll$().subscribe((response) => {
      this.carreras = response.data || [];
    });
  }


  private inicio(): any {
    const controls = {
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaInicio: [''],
      idPrograma: [''],
      idCarrera: [''],
    };
    this.formGroup = this.formBuilder.group(controls);
  }

  save(name: any): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const save: any = {
      nombre: name.nombre,
      descripcion: name.descripcion,
      fechaInicio: name.fechaInicio,
      programa: {
        idPrograma: name.idPrograma,
      },
      carrera: {
        idCarrera: name.idCarrera,
      },
    };

    this.tallerServiceAdd.add$(save).subscribe(
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

    const save: any = {
      idTaller: this.idTaller,
      nombre: name.nombre,
      descripcion: name.descripcion,
      fechaInicio: name.fechaInicio,
      programa: {
        idPrograma: name.idPrograma,
      },
      carrera: {
        idCarrera: name.idCarrera,
      },
    };

    this.tallerServieEdit.update$(this.idTaller, save).subscribe(
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
    this.idTaller = data.idTaller;
    this.formGroup.patchValue({
      nombre: data.nombre,
      descripcion: data.descripcion,
      fechaInicio: data.fechaInicio,
      idPrograma: data.idPrograma,
      idCarrera: data.idCarrera,
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
