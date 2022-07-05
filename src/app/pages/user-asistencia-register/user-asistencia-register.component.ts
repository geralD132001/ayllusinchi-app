import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AsistenciaAddService } from '../../providers/services/asistencia-add.service';

@Component({
  selector: 'app-user-asistencia-register',
  templateUrl: './user-asistencia-register.component.html',
  styles: [],
})
export class UserAsistenciaRegisterComponent implements OnInit {

  asistencia: any[] = [];
  @Input() item: any;
  @Input() id_asistencia: any;
  @Input() title: any;
  idAsistencia: string;
  isUpdating: boolean;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private asistenciaAddService: AsistenciaAddService
  ) {}

  ngOnInit(): void {
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
      evidencia: ['', [Validators.required]],
      rptadetalle: ['', [Validators.required]],
      rptaRelacion: ['', [Validators.required]],
      rptaNecesidad: ['', [Validators.required]],
      rptaRegreso: ['', [Validators.required]],
      rptaInteresado: ['', [Validators.required]],
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
