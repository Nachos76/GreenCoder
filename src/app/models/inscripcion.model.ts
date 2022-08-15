import { Alumno } from './alumno.model';
import { Curso } from './curso.model';
export interface Inscripcion {
  [key: string]: any;
  id: number;
  curso?: Curso;
  alumno?: Alumno;
  estado: number;
  fecha?: string;
  cursoId?: number;
  alumnoId?: number;
}
