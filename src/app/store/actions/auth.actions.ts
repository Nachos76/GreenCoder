import { AuthUser } from '@app/models/auth.model';
import { Usuario } from '@app/models/usuario.model';
import { createAction, props } from '@ngrx/store';

export const AUTH_ACTIONS = {
  Login: {
    run: createAction(
      '[Login] iniciar sesión',
      props<{ authUser: AuthUser }>()
    ),
    success: createAction(
      '[Login] iniciar sesión exitosa',
      props<{ usuario: Usuario; token: string; recordarme: boolean }>()
    ),
    failed: createAction(
      '[Login] iniciar sesión fallida',
      props<{ error: Error }>()
    ),
  },
  Logout: {
    run: createAction('[Logout] cerrar sesión'),
  },

  EditProfile: {
    run: createAction(
      '[EditProfile] guardar perfil usuario',
      props<{ usuario: Usuario }>()
    ),
    success: createAction(
      '[EditProfile] guardar perfil exitosa',
      props<{ usuario: Usuario }>()
    ),
    failed: createAction(
      '[EditProfile] guardar perfil fallida',
      props<{ error: Error }>()
    ),
  },
  Forgot: {
    run: createAction(
      '[Forgot] recuperar contraseña',
      props<{ email: string }>()
    ),
    success: createAction(
      '[Forgot] recuperar contraseña exitosa',
      props<{ tempPassword: string }>()
    ),
    failed: createAction(
      '[Forgot] recuperar contraseña fallida',
      props<{ error: Error }>()
    ),
  },

  CreateProfile: {
    run: createAction(
      '[CreateProfile] crear perfil usuario',
      props<{ usuario: Usuario }>()
    ),
    success: createAction(
      '[CreateProfile] crear perfil exitosa',
      props<{ usuario: Usuario }>()
    ),
    failed: createAction(
      '[CreateProfile] crear perfil fallida',
      props<{ error: Error }>()
    ),
  },
};
