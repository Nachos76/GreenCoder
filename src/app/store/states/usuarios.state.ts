import { Usuario } from '@app/models/usuario.model';

export interface IUsuariosState {
  usuarios: Usuario[];
  selectedUsuario: Usuario | null;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialUsuariosState: IUsuariosState = {
  error: null,
  loaded: false,
  loading: false,
  selectedUsuario: null,
  usuarios: [],
};
