import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AUTH_ACTIONS } from '../actions/auth.actions';
import { emptyAction } from '../app.reducer';
import { UsuarioService } from '@app/core/services/usuario.service';
import { state } from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  loginEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.Login.run),
      mergeMap(action => {
        return this.authService.login(action.authUser).pipe(
          map(usuario => {
            return usuario
              ? AUTH_ACTIONS.Login.success({
                  usuario: usuario,
                  token: usuario.email,
                  recordarme: action.authUser.recordarme,
                })
              : AUTH_ACTIONS.Login.failed({
                  error: new Error('Credenciales no válidas'),
                });
          }),
          catchError(error => of(AUTH_ACTIONS.Login.failed({ error })))
        );
      })
    );
  });

  loginSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.Login.success),
      map(({ usuario, token, recordarme }) => {
        if (recordarme) {
          localStorage.setItem('token', token);
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        }
        this.router.navigate(['/']);
        return emptyAction();
      })
    );
  });

  logoutEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.Logout.run),
      map(_ => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioActual');
        this.router.navigate(['/login']);
        return emptyAction();
      })
    );
  });

  editProfileEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.EditProfile.run),
      mergeMap(action => {
        return this.usuarioService.editarUsuario(action.usuario).pipe(
          map(usuario => {
            return usuario
              ? AUTH_ACTIONS.EditProfile.success({
                  usuario,
                })
              : AUTH_ACTIONS.EditProfile.failed({
                  error: new Error('Error al actualizar el perfil'),
                });
          }),
          catchError(error => of(AUTH_ACTIONS.EditProfile.failed({ error })))
        );
      })
    );
  });

  editProfileSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.EditProfile.success),
      map(() => {
        this.router.navigate(['/']);
        return emptyAction();
      })
    );
  });

  forgotffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.Forgot.run),
      mergeMap(action => {
        return this.authService.recuperarPass(action.email).pipe(
          map(pass => {
            return pass
              ? AUTH_ACTIONS.Forgot.success({ tempPassword: pass })
              : AUTH_ACTIONS.Forgot.failed({
                  error: new Error('Usuario no encontrado'),
                });
          }),
          catchError(error => of(AUTH_ACTIONS.Forgot.failed({ error })))
        );
      })
    );
  });

  createProfileEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.CreateProfile.run),
      mergeMap(action => {
        return this.usuarioService.agregarUsuario(action.usuario).pipe(
          map(usuario => {
            return usuario
              ? AUTH_ACTIONS.CreateProfile.success({
                  usuario,
                })
              : AUTH_ACTIONS.CreateProfile.failed({
                  error: new Error('Error al crear el perfil'),
                });
          }),
          catchError(error => of(AUTH_ACTIONS.CreateProfile.failed({ error })))
        );
      })
    );
  });

  createProfileSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AUTH_ACTIONS.CreateProfile.success),
      map(() => {
        this.router.navigate(['/']);
        return emptyAction();
      })
    );
  });
}
