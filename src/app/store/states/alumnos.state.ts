import { Alumno } from '@app/models/alumno.model';

export interface IAlumnosState {
  alumnos: Alumno[];
  selectedAlumno: Alumno | null;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialAlumnosState: IAlumnosState = {
  error: null,
  loaded: false,
  loading: false,
  selectedAlumno: null,
  alumnos: [],
};
