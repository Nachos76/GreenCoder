import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAlumnosState } from '../states/alumnos.state';

const selectAlumnosState = createFeatureSelector<IAlumnosState>('alumnos');
const selectGetAlumnos = createSelector(
  selectAlumnosState,
  state => state.alumnos
);
const selectGetAlumnosLoading = createSelector(
  selectAlumnosState,
  state => state.loading
);
const selectGetAlumnosLoaded = createSelector(
  selectAlumnosState,
  state => state.loaded
);
const selectGetAlumnoSeleccionado = createSelector(
  selectAlumnosState,
  state => state.selectedAlumno
);
const selectGetAlumnoById = (Id: number) =>
  createSelector(selectAlumnosState, state => {
    let alumnobyId = state.alumnos.filter(_ => _.id == Id);
    if (alumnobyId.length == 0) {
      return null;
    }
    return alumnobyId[0];
  });

export const ALUMNOS_SELECTORS = {
  selectGetAlumnos,
  selectGetAlumnosLoading,
  selectGetAlumnosLoaded,
  selectGetAlumnoSeleccionado,
  selectGetAlumnoById,
};
