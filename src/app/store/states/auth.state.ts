import { Usuario } from '@app/models/usuario.model';

export interface IAuthState {
  usuario: Usuario | null;
  token: string | null;
  loading: boolean;
  recordarme: boolean;
  hasError: boolean;
  errorMessage: string | null;
  loggedIn: boolean;
  tempPassword: string | null;
}

export const initialAuthState: IAuthState = {
  usuario: localStorage.getItem('usuarioActual')
    ? (JSON.parse(localStorage.getItem('usuarioActual') || '{}') as Usuario)
    : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  loading: false,
  hasError: false,
  errorMessage: null,
  loggedIn: localStorage.getItem('token') ? true : false,
  recordarme: localStorage.getItem('token') ? true : false,
  tempPassword: null,
};
