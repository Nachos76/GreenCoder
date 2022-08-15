import { createReducer, on } from '@ngrx/store';
import { INSCRIPCIONES_ACTIONS } from '../actions/inscripciones.actions';
import { initialInscripcionesState } from '../states/inscripciones.state';

export const inscripcionesReducer = createReducer(
  initialInscripcionesState,
  on(INSCRIPCIONES_ACTIONS.load.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.load.success, (state, { inscripciones }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      inscripciones,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.load.failed, state => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.edit.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.edit.success, (state, { inscripcion }) => {
    return {
      ...state,
      inscripcion,
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.edit.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.create.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.create.success, (state, { inscripcion }) => {
    return {
      ...state,
      inscripciones: [...state.inscripciones, inscripcion],
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.create.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.delete.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.delete.success, (state, { id }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedInscripcion: null,
      inscripciones: state.inscripciones.filter(_ => _.id != id),
    };
  }),
  on(INSCRIPCIONES_ACTIONS.delete.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.select.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.select.success, (state, { inscripcion }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedInscripcion: inscripcion,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.select.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.noSelect.run, state => {
    return {
      ...state,
      selectedInscripcion: null,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.loadxCurso.run, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.loadxCurso.success, (state, { inscripciones }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      inscripciones,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.loadxCurso.failed, state => {
    return {
      ...state,
      loading: false,
      loaded: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.loadxAlumno.run, state => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.loadxAlumno.success, (state, { inscripciones }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      inscripciones,
    };
  }),
  on(INSCRIPCIONES_ACTIONS.loadxAlumno.failed, state => {
    return {
      ...state,
      loading: false,
      loaded: false,
    };
  })
);
