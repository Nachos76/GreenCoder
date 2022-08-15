import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoleGuard } from '@app/core/guards/auth-role.guard';
import { Roles } from '@app/models/roles.enum';
import { DetalleAlumnoComponent } from './detalle-alumno/detalle-alumno.component';
import { FormularioAlumnoComponent } from './formulario-alumno/formulario-alumno.component';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';

const routes: Routes = [
  { path: '', component: ListadoAlumnosComponent },
  {
    path: 'form/:id',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: FormularioAlumnoComponent,
  },
  {
    path: 'form',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: FormularioAlumnoComponent,
  },
  { path: 'detalle/:id', component: DetalleAlumnoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosRoutingModule {}
