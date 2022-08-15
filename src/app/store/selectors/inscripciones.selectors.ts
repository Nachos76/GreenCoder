import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IInscripcionesState } from '../states/inscripciones.state';

const selectInscripcionesState =
  createFeatureSelector<IInscripcionesState>('inscripciones');
const selectGetInscripciones = createSelector(
  selectInscripcionesState,
  state => state.inscripciones
);
const selectGetInscripcionesLoading = createSelector(
  selectInscripcionesState,
  state => state.loading
);
const selectGetInscripcionesLoaded = createSelector(
  selectInscripcionesState,
  state => state.loaded
);
const selectGetInscripcionSeleccionado = createSelector(
  selectInscripcionesState,
  state => state.selectedInscripcion
);
const selectGetInscripcionById = (Id: number) =>
  createSelector(selectInscripcionesState, state => {
    let inscripcionbyId = state.inscripciones.filter(_ => _.id == Id);
    if (inscripcionbyId.length == 0) {
      return null;
    }
    return inscripcionbyId[0];
  });

export const INSCRIPCIONES_SELECTORS = {
  selectGetInscripciones,
  selectGetInscripcionesLoading,
  selectGetInscripcionesLoaded,
  selectGetInscripcionSeleccionado,
  selectGetInscripcionById,
};
