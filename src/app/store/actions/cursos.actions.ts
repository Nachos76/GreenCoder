import { Curso } from '@app/models/curso.model';
import { createAction, props } from '@ngrx/store';

export const CURSOS_ACTIONS = {
  load: {
    run: createAction('[Cursos] cargar cursos', props<{ nombre?: string }>()),
    success: createAction(
      '[Cursos] cargar cursos exitoso',
      props<{ cursos: Curso[] }>()
    ),
    failed: createAction(
      '[Cursos] cargar cursos fallido',
      props<{ error: Error }>()
    ),
  },
  edit: {
    run: createAction('[EditCurso] editar curso', props<{ curso: Curso }>()),
    success: createAction(
      '[EditCurso] editar curso exitoso',
      props<{ curso: Curso }>()
    ),
    failed: createAction(
      '[EditCurso] editar curso fallido',
      props<{ error: Error }>()
    ),
  },
  create: {
    run: createAction('[CreateCurso] crear curso', props<{ curso: Curso }>()),
    success: createAction(
      '[CreateCurso] crear curso exitoso',
      props<{ curso: Curso }>()
    ),
    failed: createAction(
      '[CreateCurso] crear curso fallido',
      props<{ error: Error }>()
    ),
  },
  delete: {
    run: createAction('[DeleteCurso] borrar curso', props<{ id: number }>()),
    success: createAction(
      '[DeleteCurso] borrar curso exitoso',
      props<{ id: number }>()
    ),
    failed: createAction(
      '[DeleteCurso] borrar curso fallido',
      props<{ error: Error }>()
    ),
  },
  select: {
    run: createAction(
      '[SelectCurso] seleccionar curso',
      props<{ id: number }>()
    ),
    success: createAction(
      '[SelectCurso] seleccionar curso exitoso',
      props<{ curso: Curso }>()
    ),
    failed: createAction(
      '[SelectCurso] seleccionar curso fallido',
      props<{ error: Error }>()
    ),
  },
  noSelect: {
    run: createAction('[NoSelectCurso] deseleccionar curso'),
  },
};
