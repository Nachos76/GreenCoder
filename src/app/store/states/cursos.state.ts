import { Curso } from '@app/models/curso.model';

export interface ICursosState {
  cursos: Curso[];
  selectedCurso: Curso | null;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export const initialCursosState: ICursosState = {
  error: null,
  loaded: false,
  loading: false,
  selectedCurso: null,
  cursos: [],
};
