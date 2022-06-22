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
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProgramaComponent } from './user-programa/user-programa.component';
import { UserTallerComponent } from './user-taller/user-taller.component';
import { UserAsistenciaComponent } from './user-asistencia/user-asistencia.component';
import { UserAsistenciaRegisterComponent } from './user-asistencia-register/user-asistencia-register.component';
import { UserAsistenciaRegisterPersonasComponent } from './user-asistencia-register-personas/user-asistencia-register-personas.component';
import { UserSobreNosotorosComponent } from './user-sobre-nosotoros/user-sobre-nosotoros.component';
import { UserContactenosComponent } from './user-contactenos/user-contactenos.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProyectoComponent,
    TallerComponent,
    PagesComponent,
    EstudiantesComponent,
    PersonasComponent,
    EstudianteComponent,
    UserDashboardComponent,
    UserProgramaComponent,
    UserTallerComponent,
    UserAsistenciaComponent,
    UserAsistenciaRegisterComponent,
    UserAsistenciaRegisterPersonasComponent,
    UserSobreNosotorosComponent,
    UserContactenosComponent
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
