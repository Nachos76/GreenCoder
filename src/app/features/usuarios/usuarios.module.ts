import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { FormularioUsuariosComponent } from './formulario-usuarios/formulario-usuarios.component';
import { MaterialModule } from '../../modules/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { usuariosReducer } from '@app/store/reducers/usuarios.reducers';
import { UsuariosEffects } from '../../store/effects/usuarios.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    FormularioUsuariosComponent,
    DetalleUsuariosComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('usuarios', usuariosReducer),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
})
export class UsuariosModule {}
