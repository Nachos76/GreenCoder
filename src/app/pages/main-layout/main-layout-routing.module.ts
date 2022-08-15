import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoleGuard } from '@app/core/guards/auth-role.guard';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { Roles } from '@app/models/roles.enum';
import { MainLayoutComponent } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../../features/cursos/cursos.module').then(
            m => m.CursosModule
          ),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./../../features/cursos/cursos.module').then(
            m => m.CursosModule
          ),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./../../features/alumnos/alumnos.module').then(
            m => m.AlumnosModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./../../features/usuarios/usuarios.module').then(
            m => m.UsuariosModule
          ),
      },
      {
        path: 'inscripciones',
        loadChildren: () =>
          import('./../../features/inscripciones/inscripciones.module').then(
            m => m.InscripcionesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
