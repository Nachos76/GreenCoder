import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioUsuariosComponent } from './formulario-usuarios/formulario-usuarios.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthRoleGuard } from '@app/core/guards/auth-role.guard';
import { Roles } from '@app/models/roles.enum';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: ListadoUsuariosComponent,
  },
  {
    path: 'form-usuarios/:id',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: FormularioUsuariosComponent,
  },
  {
    path: 'form-usuarios',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: FormularioUsuariosComponent,
  },
  {
    path: 'detalle/:id',
    canActivate: [AuthRoleGuard],
    data: {
      roles: [Roles.ADMIN],
    },
    component: DetalleUsuariosComponent,
  },
  { path: 'perfil', canActivate: [AuthGuard], component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
