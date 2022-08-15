import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, catchError, retry, map } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient, private commonService: CommonService) {}

  obtenerInscripciones(nombre?: string) {
    return this.http.get<Inscripcion[]>(this.urlAPI + 'inscripciones').pipe(
      retry(3),
      map(inscripciones =>
        nombre
          ? inscripciones.filter(inscripcion =>
              (
                inscripcion.fecha +
                ' ' +
                inscripcion.estado +
                ' ' +
                inscripcion.id +
                ' ' +
                inscripcion.alumno?.nombre +
                ' ' +
                inscripcion.alumno?.apellido +
                ' ' +
                inscripcion.curso?.nombre
              )
                .toLowerCase()
                .includes(nombre.toLowerCase().trim())
            )
          : inscripciones
      ),

      catchError(this.commonService.errorHandler)
    );
  }

  seleccionarInscripcionxId(id: number): Observable<Inscripcion> {
    return this.http
      .get<Inscripcion>(this.urlAPI + 'inscripciones/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  borrarInscripcionxId(id: number) {
    return this.http
      .delete<Inscripcion>(this.urlAPI + 'inscripciones/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  editarInscripcion(inscripcion: Inscripcion) {
    return this.http
      .put<Inscripcion>(
        this.urlAPI + 'inscripciones/' + inscripcion.id,
        inscripcion
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  agregarInscripcion(inscripcion: Inscripcion) {
    return this.http
      .post<Inscripcion>(this.urlAPI + 'inscripciones', inscripcion)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  //MockApi no permite buscar por un elemento hijo, asi que las busquedas son sobre todas las inscripciones lamentablemente,, pero esta la idea
  obtenerInscripcionesxCurso(id?: number, nombre?: string) {
    return this.http
      .get<Inscripcion[]>(this.urlAPI + 'inscripciones?cursoId=' + id)
      .pipe(
        retry(3),
        map(inscripciones =>
          nombre
            ? inscripciones.filter(inscripcion =>
                (
                  inscripcion.alumno?.nombre +
                  ' ' +
                  inscripcion.alumno?.apellido +
                  ' ' +
                  inscripcion.alumno?.id
                )
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : inscripciones
        ),
        catchError(this.commonService.errorHandler)
      );
  }

  obtenerInscripcionesxAlumno(id?: number, nombre?: string) {
    return this.http
      .get<Inscripcion[]>(this.urlAPI + 'inscripciones?alumnoId=' + id)
      .pipe(
        retry(3),
        map(inscripciones =>
          nombre
            ? inscripciones.filter(inscripcion =>
                (inscripcion.curso?.nombre + ' ' + inscripcion.curso?.id)
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : inscripciones
        ),
        catchError(this.commonService.errorHandler)
      );
  }
}
