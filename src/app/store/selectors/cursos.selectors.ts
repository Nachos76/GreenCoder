import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICursosState } from '../states/cursos.state';

const selectCursosState = createFeatureSelector<ICursosState>('cursos');
const selectGetCursos = createSelector(
  selectCursosState,
  state => state.cursos
);
const selectGetCursosLoading = createSelector(
  selectCursosState,
  state => state.loading
);
const selectGetCursosLoaded = createSelector(
  selectCursosState,
  state => state.loaded
);
const selectGetCursoSeleccionado = createSelector(
  selectCursosState,
  state => state.selectedCurso
);
const selectGetCursoById = (Id: number) =>
  createSelector(selectCursosState, state => {
    let cursobyId = state.cursos.filter(_ => _.id == Id);
    if (cursobyId.length == 0) {
      return null;
    }
    return cursobyId[0];
  });

export const CURSOS_SELECTORS = {
  selectGetCursos,
  selectGetCursosLoading,
  selectGetCursosLoaded,
  selectGetCursoSeleccionado,
  selectGetCursoById,
};
