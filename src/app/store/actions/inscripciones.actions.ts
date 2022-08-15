import { Inscripcion } from '@app/models/inscripcion.model';
import { createAction, props } from '@ngrx/store';

export const INSCRIPCIONES_ACTIONS = {
  load: {
    run: createAction(
      '[Inscripciones] cargar inscripciones',
      props<{ nombre?: string }>()
    ),
    success: createAction(
      '[Inscripciones] cargar inscripciones exitoso',
      props<{ inscripciones: Inscripcion[] }>()
    ),
    failed: createAction(
      '[Inscripciones] cargar inscripciones fallido',
      props<{ error: Error }>()
    ),
  },
  edit: {
    run: createAction(
      '[EditInscripcion] editar inscripcion',
      props<{ inscripcion: Inscripcion }>()
    ),
    success: createAction(
      '[EditInscripcion] editar inscripcion exitoso',
      props<{ inscripcion: Inscripcion }>()
    ),
    failed: createAction(
      '[EditInscripcion] editar inscripcion fallido',
      props<{ error: Error }>()
    ),
  },
  create: {
    run: createAction(
      '[CreateInscripcion] crear inscripcion',
      props<{ inscripcion: Inscripcion }>()
    ),
    success: createAction(
      '[CreateInscripcion] crear inscripcion exitoso',
      props<{ inscripcion: Inscripcion }>()
    ),
    failed: createAction(
      '[CreateInscripcion] crear inscripcion fallido',
      props<{ error: Error }>()
    ),
  },
  delete: {
    run: createAction(
      '[DeleteInscripcion] borrar inscripcion',
      props<{ id: number }>()
    ),
    success: createAction(
      '[DeleteInscripcion] borrar inscripcion exitoso',
      props<{ id: number }>()
    ),
    failed: createAction(
      '[DeleteInscripcion] borrar inscripcion fallido',
      props<{ error: Error }>()
    ),
  },
  select: {
    run: createAction(
      '[SelectInscripcion] seleccionar inscripcion',
      props<{ id: number }>()
    ),
    success: createAction(
      '[SelectInscripcion] seleccionar inscripcion exitoso',
      props<{ inscripcion: Inscripcion }>()
    ),
    failed: createAction(
      '[SelectInscripcion] seleccionar inscripcion fallido',
      props<{ error: Error }>()
    ),
  },
  noSelect: {
    run: createAction('[NoSelectInscripcion] deseleccionar inscripcion'),
  },
  loadxCurso: {
    run: createAction(
      '[Inscripciones] cargar inscripciones por curso',
      props<{ idCurso: number; nombre?: string }>()
    ),
    success: createAction(
      '[Inscripciones] cargar inscripciones exitoso  por curso',
      props<{ inscripciones: Inscripcion[] }>()
    ),
    failed: createAction(
      '[Inscripciones] cargar inscripciones fallido  por curso',
      props<{ error: Error }>()
    ),
  },
  loadxAlumno: {
    run: createAction(
      '[Inscripciones] cargar inscripciones por alumno',
      props<{ idAlumno: number; nombre?: string }>()
    ),
    success: createAction(
      '[Inscripciones] cargar inscripciones exitoso  por alumno',
      props<{ inscripciones: Inscripcion[] }>()
    ),
    failed: createAction(
      '[Inscripciones] cargar inscripciones fallido  por alumno',
      props<{ error: Error }>()
    ),
  },
};
