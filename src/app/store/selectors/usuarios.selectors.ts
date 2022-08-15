import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsuariosState } from '../states/usuarios.state';

const selectUsuariosState = createFeatureSelector<IUsuariosState>('usuarios');
const selectGetUsuarios = createSelector(
  selectUsuariosState,
  state => state.usuarios
);
const selectGetUsuariosLoading = createSelector(
  selectUsuariosState,
  state => state.loading
);
const selectGetUsuariosLoaded = createSelector(
  selectUsuariosState,
  state => state.loaded
);
const selectGetUsuarioSeleccionado = createSelector(
  selectUsuariosState,
  state => state.selectedUsuario
);
const selectGetUsuarioById = (Id: number) =>
  createSelector(selectUsuariosState, state => {
    let usuariobyId = state.usuarios.filter(_ => _.id == Id);
    if (usuariobyId.length == 0) {
      return null;
    }
    return usuariobyId[0];
  });

export const USUARIOS_SELECTORS = {
  selectGetUsuarios,
  selectGetUsuariosLoading,
  selectGetUsuariosLoaded,
  selectGetUsuarioSeleccionado,
  selectGetUsuarioById,
};
