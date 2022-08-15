import { Usuario } from '@app/models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const USUARIOS_ACTIONS = {
  load: {
    run: createAction(
      '[Usuarios] cargar usuarios',
      props<{ nombre?: string }>()
    ),
    success: createAction(
      '[Usuarios] cargar usuarios exitoso',
      props<{ usuarios: Usuario[] }>()
    ),
    failed: createAction(
      '[Usuarios] cargar usuarios fallido',
      props<{ error: Error }>()
    ),
  },
  edit: {
    run: createAction(
      '[EditUsuario] editar usuario',
      props<{ usuario: Usuario }>()
    ),
    success: createAction(
      '[EditUsuario] editar usuario exitoso',
      props<{ usuario: Usuario }>()
    ),
    failed: createAction(
      '[EditUsuario] editar usuario fallido',
      props<{ error: Error }>()
    ),
  },
  create: {
    run: createAction(
      '[CreateUsuario] crear usuario',
      props<{ usuario: Usuario }>()
    ),
    success: createAction(
      '[CreateUsuario] crear usuario exitoso',
      props<{ usuario: Usuario }>()
    ),
    failed: createAction(
      '[CreateUsuario] crear usuario fallido',
      props<{ error: Error }>()
    ),
  },
  delete: {
    run: createAction(
      '[DeleteUsuario] borrar usuario',
      props<{ id: number }>()
    ),
    success: createAction(
      '[DeleteUsuario] borrar usuario exitoso',
      props<{ id: number }>()
    ),
    failed: createAction(
      '[DeleteUsuario] borrar usuario fallido',
      props<{ error: Error }>()
    ),
  },
  select: {
    run: createAction(
      '[SelectUsuario] seleccionar usuario',
      props<{ id: number }>()
    ),
    success: createAction(
      '[SelectUsuario] seleccionar usuario exitoso',
      props<{ usuario: Usuario }>()
    ),
    failed: createAction(
      '[SelectUsuario] seleccionar usuario fallido',
      props<{ error: Error }>()
    ),
  },
  noSelect: {
    run: createAction('[NoSelectUsuario] deseleccionar usuario'),
  },
};
