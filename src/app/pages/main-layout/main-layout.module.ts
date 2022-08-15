import { AlumnosModule } from '../../features/alumnos/alumnos.module';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { LayoutModule } from '../../layout/layout.module';
import { MainLayoutComponent } from './main-layout.component';
import { NgModule } from '@angular/core';
import { CursosModule } from '../../features/cursos/cursos.module';
import { InscripcionesModule } from '../../features/inscripciones/inscripciones.module';
import { UsuariosModule } from '../../features/usuarios/usuarios.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    LayoutModule,
    CursosModule,
    AlumnosModule,
    InscripcionesModule,
    UsuariosModule,
  ],
})
export class MainLayoutModule {}
