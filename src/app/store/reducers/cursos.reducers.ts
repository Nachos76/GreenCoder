import { createReducer, on } from '@ngrx/store';
import { CURSOS_ACTIONS } from '../actions/cursos.actions';
import { initialCursosState } from '../states/cursos.state';

export const cursosReducer = createReducer(
  initialCursosState,
  on(CURSOS_ACTIONS.load.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CURSOS_ACTIONS.load.success, (state, { cursos }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      cursos,
    };
  }),
  on(CURSOS_ACTIONS.load.failed, state => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(CURSOS_ACTIONS.edit.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CURSOS_ACTIONS.edit.success, (state, { curso }) => {
    return {
      ...state,
      curso,
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(CURSOS_ACTIONS.edit.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(CURSOS_ACTIONS.create.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CURSOS_ACTIONS.create.success, (state, { curso }) => {
    return {
      ...state,
      cursos: [...state.cursos, curso],
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(CURSOS_ACTIONS.create.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(CURSOS_ACTIONS.delete.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CURSOS_ACTIONS.delete.success, (state, { id }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedCurso: null,
      cursos: state.cursos.filter(_ => _.id != id),
    };
  }),
  on(CURSOS_ACTIONS.delete.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(CURSOS_ACTIONS.select.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(CURSOS_ACTIONS.select.success, (state, { curso }) => {
    return {
      ...state,
      loading: false,
      hasError: false,
      errorMessage: null,
      selectedCurso: curso,
    };
  }),
  on(CURSOS_ACTIONS.select.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(CURSOS_ACTIONS.noSelect.run, state => {
    return {
      ...state,
      selectedCurso: null,
    };
  })
);
