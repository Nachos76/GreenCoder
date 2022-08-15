import { createReducer, on } from '@ngrx/store';
import { ALUMNOS_ACTIONS } from '../actions/alumnos.actions';
import { initialAlumnosState } from '../states/alumnos.state';

export const alumnosReducer = createReducer(
  initialAlumnosState,
  on(ALUMNOS_ACTIONS.load.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ALUMNOS_ACTIONS.load.success, (state, { alumnos }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      alumnos,
    };
  }),
  on(ALUMNOS_ACTIONS.load.failed, state => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(ALUMNOS_ACTIONS.edit.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ALUMNOS_ACTIONS.edit.success, (state, { alumno }) => {
    return {
      ...state,
      alumno,
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(ALUMNOS_ACTIONS.edit.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(ALUMNOS_ACTIONS.create.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ALUMNOS_ACTIONS.create.success, (state, { alumno }) => {
    return {
      ...state,
      alumnos: [...state.alumnos, alumno],
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(ALUMNOS_ACTIONS.create.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(ALUMNOS_ACTIONS.delete.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ALUMNOS_ACTIONS.delete.success, (state, { id }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedAlumno: null,
      alumnos: state.alumnos.filter(_ => _.id != id),
    };
  }),
  on(ALUMNOS_ACTIONS.delete.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(ALUMNOS_ACTIONS.select.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ALUMNOS_ACTIONS.select.success, (state, { alumno }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedAlumno: alumno,
    };
  }),
  on(ALUMNOS_ACTIONS.select.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(ALUMNOS_ACTIONS.noSelect.run, state => {
    return {
      ...state,
      selectedAlumno: null,
    };
  })
);
