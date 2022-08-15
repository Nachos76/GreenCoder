import { Inscripcion } from '@app/models/inscripcion.model';

export interface IInscripcionesState {
  inscripciones: Inscripcion[];
  selectedInscripcion: Inscripcion | null;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialInscripcionesState: IInscripcionesState = {
  error: null,
  loaded: false,
  loading: false,
  selectedInscripcion: null,
  inscripciones: [],
};
