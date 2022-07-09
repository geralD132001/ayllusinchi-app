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
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProgramaComponent } from './user-programa/user-programa.component';
import { UserTallerComponent } from './user-taller/user-taller.component';
import { UserAsistenciaComponent } from './user-asistencia/user-asistencia.component';
import { UserAsistenciaRegisterComponent } from './user-asistencia-register/user-asistencia-register.component';
import { UserAsistenciaRegisterPersonasComponent } from './user-asistencia-register-personas/user-asistencia-register-personas.component';
import { UserSobreNosotorosComponent } from './user-sobre-nosotoros/user-sobre-nosotoros.component';
import { UserContactenosComponent } from './user-contactenos/user-contactenos.component';
import { DetalleAsistenciaComponent } from './detalle-asistencia/detalle-asistencia.component';

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
      { path: 'asistencia/estudiante/ver/:id', component: EstudianteComponent },
    ],
  },

  {
    path: 'user-dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: UserDashboardComponent },
      { path: 'programas', component: UserProgramaComponent },
      { path: 'talleres', component: UserTallerComponent },
      { path: 'asistencia', component: UserAsistenciaComponent },
      { path: 'asistencia/ver/:id', component: UserAsistenciaComponent },
      { path: 'registrar-asistencia', component: UserAsistenciaRegisterComponent },
      { path: 'registrar-asistencia/personas', component: UserAsistenciaRegisterPersonasComponent },
      { path: 'sobre-nosotros', component: UserSobreNosotorosComponent },
      { path: 'contactanos', component: UserContactenosComponent },

    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
