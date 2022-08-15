import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@app/core/services/usuario.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { USUARIOS_ACTIONS } from '../actions/usuarios.actions';
import { emptyAction } from '../app.reducer';

@Injectable({ providedIn: 'root' })
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  usuariosEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.load.run),
      mergeMap(action => {
        return this.usuarioService.obtenerUsuarios(action.nombre).pipe(
          map(usuarios => {
            return usuarios
              ? USUARIOS_ACTIONS.load.success({
                  usuarios,
                })
              : USUARIOS_ACTIONS.load.failed({
                  error: new Error('Error al cargar los usuarios'),
                });
          }),
          catchError(error => of(USUARIOS_ACTIONS.load.failed({ error })))
        );
      })
    );
  });

  createUsuarioEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.create.run),
      mergeMap(action => {
        return this.usuarioService.agregarUsuario(action.usuario).pipe(
          map(usuario => {
            return usuario
              ? USUARIOS_ACTIONS.create.success({
                  usuario,
                })
              : USUARIOS_ACTIONS.create.failed({
                  error: new Error('Error al crear el usuario'),
                });
          }),
          catchError(error => of(USUARIOS_ACTIONS.create.failed({ error })))
        );
      })
    );
  });

  createUsuarioSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.create.success),
      map(() => {
        this.router.navigate(['/usuarios']);
        return emptyAction();
      })
    );
  });

  editUsuarioEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.edit.run),
      mergeMap(action => {
        return this.usuarioService.editarUsuario(action.usuario).pipe(
          map(usuario => {
            return usuario
              ? USUARIOS_ACTIONS.edit.success({
                  usuario,
                })
              : USUARIOS_ACTIONS.edit.failed({
                  error: new Error('Error al actualizar el perfil'),
                });
          }),
          catchError(error => of(USUARIOS_ACTIONS.edit.failed({ error })))
        );
      })
    );
  });

  editUsuarioSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.edit.success),
      map(() => {
        this.router.navigate(['/usuarios']);
        return emptyAction();
      })
    );
  });

  deleteUsuarioEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.delete.run),
      mergeMap(action => {
        return this.usuarioService.borrarUsuarioxId(action.id).pipe(
          map(usuario => {
            return usuario
              ? USUARIOS_ACTIONS.delete.success({
                  id: usuario.id,
                })
              : USUARIOS_ACTIONS.delete.failed({
                  error: new Error('Error al eliminar usuario'),
                });
          }),
          catchError(error => of(USUARIOS_ACTIONS.delete.failed({ error })))
        );
      })
    );
  });

  deleteUsuarioSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.delete.success),
      map(() => {
        return emptyAction();
      })
    );
  });

  selectUsuarioEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.select.run),
      mergeMap(action => {
        return this.usuarioService.seleccionarUsuarioxId(action.id).pipe(
          map(usuario => {
            return usuario
              ? USUARIOS_ACTIONS.select.success({
                  usuario,
                })
              : USUARIOS_ACTIONS.select.failed({
                  error: new Error('Error al seleccionar usuario'),
                });
          }),
          catchError(error => of(USUARIOS_ACTIONS.select.failed({ error })))
        );
      })
    );
  });

  selectUsuarioSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(USUARIOS_ACTIONS.select.success),
      map(() => {
        return emptyAction();
      })
    );
  });
}
