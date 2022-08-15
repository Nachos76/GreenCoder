import { createReducer, on } from '@ngrx/store';
import { USUARIOS_ACTIONS } from '../actions/usuarios.actions';
import { initialUsuariosState } from '../states/usuarios.state';

export const usuariosReducer = createReducer(
  initialUsuariosState,
  on(USUARIOS_ACTIONS.load.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(USUARIOS_ACTIONS.load.success, (state, { usuarios }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      usuarios,
    };
  }),
  on(USUARIOS_ACTIONS.load.failed, state => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(USUARIOS_ACTIONS.edit.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(USUARIOS_ACTIONS.edit.success, (state, { usuario }) => {
    return {
      ...state,
      usuario,
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(USUARIOS_ACTIONS.edit.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(USUARIOS_ACTIONS.create.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(USUARIOS_ACTIONS.create.success, (state, { usuario }) => {
    return {
      ...state,
      usuarios: [...state.usuarios, usuario],
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(USUARIOS_ACTIONS.create.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(USUARIOS_ACTIONS.delete.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(USUARIOS_ACTIONS.delete.success, (state, { id }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedUsuario: null,
      usuarios: state.usuarios.filter(_ => _.id != id),
    };
  }),
  on(USUARIOS_ACTIONS.delete.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(USUARIOS_ACTIONS.select.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(USUARIOS_ACTIONS.select.success, (state, { usuario }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedUsuario: usuario,
    };
  }),
  on(USUARIOS_ACTIONS.select.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(USUARIOS_ACTIONS.noSelect.run, state => {
    return {
      ...state,
      selectedUsuario: null,
    };
  })
);
