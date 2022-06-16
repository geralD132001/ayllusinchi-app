import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { TallerComponent } from './taller/taller.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { PersonasComponent } from './personas/personas.component';
import { EstudianteComponent } from './estudiante/estudiante.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProyectoComponent,
    TallerComponent,
    PagesComponent,
    EstudiantesComponent,
    PersonasComponent,
    EstudianteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    AdminDashboardComponent,
    ProyectoComponent,
    TallerComponent
  ]
})
export class PagesModule { }
