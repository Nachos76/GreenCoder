import { Alumno } from '@app/models/alumno.model';
import { createAction, props } from '@ngrx/store';

export const ALUMNOS_ACTIONS = {
  load: {
    run: createAction('[Alumnos] cargar alumnos', props<{ nombre?: string }>()),
    success: createAction(
      '[Alumnos] cargar alumnos exitoso',
      props<{ alumnos: Alumno[] }>()
    ),
    failed: createAction(
      '[Alumnos] cargar alumnos fallido',
      props<{ error: Error }>()
    ),
  },
  edit: {
    run: createAction(
      '[EditAlumno] editar alumno',
      props<{ alumno: Alumno }>()
    ),
    success: createAction(
      '[EditAlumno] editar alumno exitoso',
      props<{ alumno: Alumno }>()
    ),
    failed: createAction(
      '[EditAlumno] editar alumno fallido',
      props<{ error: Error }>()
    ),
  },
  create: {
    run: createAction(
      '[CreateAlumno] crear alumno',
      props<{ alumno: Alumno }>()
    ),
    success: createAction(
      '[CreateAlumno] crear alumno exitoso',
      props<{ alumno: Alumno }>()
    ),
    failed: createAction(
      '[CreateAlumno] crear alumno fallido',
      props<{ error: Error }>()
    ),
  },
  delete: {
    run: createAction('[DeleteAlumno] borrar alumno', props<{ id: number }>()),
    success: createAction(
      '[DeleteAlumno] borrar alumno exitoso',
      props<{ id: number }>()
    ),
    failed: createAction(
      '[DeleteAlumno] borrar alumno fallido',
      props<{ error: Error }>()
    ),
  },
  select: {
    run: createAction(
      '[SelectAlumno] seleccionar alumno',
      props<{ id: number }>()
    ),
    success: createAction(
      '[SelectAlumno] seleccionar alumno exitoso',
      props<{ alumno: Alumno }>()
    ),
    failed: createAction(
      '[SelectAlumno] seleccionar alumno fallido',
      props<{ error: Error }>()
    ),
  },
  noSelect: {
    run: createAction('[NoSelectAlumno] deseleccionar alumno'),
  },
};
