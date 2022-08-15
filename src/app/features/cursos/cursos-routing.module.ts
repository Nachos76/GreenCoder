import { RouterModule, Routes } from '@angular/router';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { FormularioCursosComponent } from './formulario-cursos/formulario-cursos.component';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { NgModule } from '@angular/core';
import { AuthRoleGuard } from '@app/core/guards/auth-role.guard';
import { Roles } from '@app/models/roles.enum';

const routes: Routes = [
  { path: '', component: ListadoCursosComponent },
  {
    path: 'form/:id',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: FormularioCursosComponent,
  },
  {
    path: 'form',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: FormularioCursosComponent,
  },
  { path: 'detalle/:id', component: DetalleCursosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
