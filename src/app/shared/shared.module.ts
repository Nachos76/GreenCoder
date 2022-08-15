import { AvatarComponent } from './components/avatar/avatar.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BadgeListComponent } from './components/badge-list/badge-list.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/Dialogs/confirm-dialog/confirm-dialog.component';
import { ContarHoyDirective } from './directives/contar-hoy.directive';
import { EsTituloDirective } from './directives/es-titulo.directive';
import { MaterialModule } from '../modules/material.module';
import { NgModule } from '@angular/core';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { RolesPermitidosDirective } from './directives/roles-permitidos.directive';
import { TituloGrillaComponent } from './components/titulo-grilla/titulo-grilla.component';
import { VisEstadoPipe } from './pipes/vis-estado.pipe';
import { VisRolesPipe } from './pipes/vis-roles.pipe';
import { LeerMasComponent } from './components/leer-mas/leer-mas.component';

@NgModule({
  declarations: [
    AvatarComponent,
    BadgeListComponent,
    BadgeComponent,
    ContarHoyDirective,
    NombreApellidoPipe,
    EsTituloDirective,
    ConfirmDialogComponent,
    TituloGrillaComponent,
    VisEstadoPipe,
    VisRolesPipe,
    RolesPermitidosDirective,
    LeerMasComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    AvatarComponent,
    BadgeListComponent,
    BadgeComponent,
    ContarHoyDirective,
    NombreApellidoPipe,
    EsTituloDirective,
    ConfirmDialogComponent,
    TituloGrillaComponent,
    VisEstadoPipe,
    VisRolesPipe,
    RolesPermitidosDirective,
    LeerMasComponent,
  ],
})
export class SharedModule {}
