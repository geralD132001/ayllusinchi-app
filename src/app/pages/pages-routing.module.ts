import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { TallerComponent } from './taller/taller.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { PersonasComponent } from './personas/personas.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'proyecto', component: ProyectoComponent },
      { path: 'programa-taller', component: TallerComponent },
      { path: 'asistencia/estudiantes', component: EstudiantesComponent },
      { path: 'asistencia/personas', component: PersonasComponent },
      { path: 'asistencia/estudiante/ver', component: EstudianteComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
