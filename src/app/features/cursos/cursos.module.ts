import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';
import { FormularioCursosComponent } from './formulario-cursos/formulario-cursos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CursosEffects } from '@app/store/effects/cursos.effects';
import { cursosReducer } from '@app/store/reducers/cursos.reducers';
import { InscripcionesEffects } from '@app/store/effects/inscripciones.effects';
import { inscripcionesReducer } from '@app/store/reducers/inscripciones.reducers';
@NgModule({
  declarations: [
    ListadoCursosComponent,
    DetalleCursosComponent,
    FormularioCursosComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('cursos', cursosReducer),
    EffectsModule.forFeature([CursosEffects]),
    StoreModule.forFeature('inscripciones', inscripcionesReducer),
    EffectsModule.forFeature([InscripcionesEffects]),
  ],
})
export class CursosModule {}
