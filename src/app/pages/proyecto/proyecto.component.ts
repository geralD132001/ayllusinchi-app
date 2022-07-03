import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoAddService } from '../../providers/services/proyecto-add.service';
import { ProyectoEditService } from '../../providers/services/proyecto-edit.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: [],
})
export class ProyectoComponent implements OnInit {
  proyecto: any[] = [];
  @Input() item: any;
  @Input() id_proyecto: any;
  @Input() title: any;
  idProyecto: string;
  isUpdating: boolean;
  formGroup: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private proyectoServiceAdd: ProyectoAddService,
    private proyectoServiceEdit: ProyectoEditService
  ) {}

  ngOnInit(): void {
    this.inicio();
    this.isUpdating = false;
    if (this.item) {
      this.updateData();
    } else {
      this.item = [];
      this.id_proyecto = '';
    }
    console.log(this.item);
  }

  private inicio(): any {
    const controls = {
      nombre: ['', [Validators.required]],
      resenia: ['', [Validators.required]],
      objetivoGeneral: [''],
      objetivoEspecifico: [''],
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
      resenia: name.resenia,
      objetivoGeneral: name.objetivoGeneral,
      objetivoEspecifico: name.objetivoEspecifico,
    };
    this.proyectoServiceAdd.add$(save).subscribe(
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
      idProyecto: this.idProyecto,
      nombre: name.nombre,
      resenia: name.resenia,
      objetivoGeneral: name.objetivoGeneral,
      objetivoEspecifico: name.objetivoEspecifico,
    };
    this.proyectoServiceEdit.update$(this.idProyecto, save).subscribe(
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
    this.idProyecto = data.idProyecto;
    this.formGroup.patchValue({
      nombre: data.nombre,
      resenia: data.resenia,
      objetivoGeneral: data.objetivoGeneral,
      objetivoEspecifico: data.objetivoEspecifico,
    });
  }


  public func() {
    this.activeModal.close();
  }

  validaForm(campo: string) {
    return this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched;
  }
}
