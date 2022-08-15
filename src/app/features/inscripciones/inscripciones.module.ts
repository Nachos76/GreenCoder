import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';
import { DetalleInscripcionesComponent } from './detalle-inscripciones/detalle-inscripciones.component';
import { FormularioInscripcionesComponent } from './formulario-inscripciones/formulario-inscripciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InscripcionesEffects } from '@app/store/effects/inscripciones.effects';
import { inscripcionesReducer } from '@app/store/reducers/inscripciones.reducers';
@NgModule({
  declarations: [
    ListadoInscripcionesComponent,
    DetalleInscripcionesComponent,
    FormularioInscripcionesComponent,
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('inscripciones', inscripcionesReducer),
    EffectsModule.forFeature([InscripcionesEffects]),
  ],
})
export class InscripcionesModule {}
