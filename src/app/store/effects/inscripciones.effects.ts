import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { InscripcionesService } from '@app/core/services/inscripciones.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { INSCRIPCIONES_ACTIONS } from '../actions/inscripciones.actions';
import { emptyAction } from '../app.reducer';

@Injectable({ providedIn: 'root' })
export class InscripcionesEffects {
  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService,
    private router: Router
  ) {}

  inscripcionesEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.load.run),
      mergeMap(action => {
        return this.inscripcionesService
          .obtenerInscripciones(action.nombre)
          .pipe(
            map(inscripciones => {
              return inscripciones
                ? INSCRIPCIONES_ACTIONS.load.success({
                    inscripciones,
                  })
                : INSCRIPCIONES_ACTIONS.load.failed({
                    error: new Error('Error al cargar los inscripciones'),
                  });
            }),
            catchError(error =>
              of(INSCRIPCIONES_ACTIONS.load.failed({ error }))
            )
          );
      })
    );
  });

  createInscripcionEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.create.run),
      mergeMap(action => {
        return this.inscripcionesService
          .agregarInscripcion(action.inscripcion)
          .pipe(
            map(inscripcion => {
              return inscripcion
                ? INSCRIPCIONES_ACTIONS.create.success({
                    inscripcion,
                  })
                : INSCRIPCIONES_ACTIONS.create.failed({
                    error: new Error('Error al crear el inscripcion'),
                  });
            }),
            catchError(error =>
              of(INSCRIPCIONES_ACTIONS.create.failed({ error }))
            )
          );
      })
    );
  });

  createInscripcionSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.create.success),
      map(() => {
        this.router.navigate(['/inscripciones']);
        return emptyAction();
      })
    );
  });

  editInscripcionEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.edit.run),
      mergeMap(action => {
        return this.inscripcionesService
          .editarInscripcion(action.inscripcion)
          .pipe(
            map(inscripcion => {
              return inscripcion
                ? INSCRIPCIONES_ACTIONS.edit.success({
                    inscripcion,
                  })
                : INSCRIPCIONES_ACTIONS.edit.failed({
                    error: new Error('Error al actualizar el perfil'),
                  });
            }),
            catchError(error =>
              of(INSCRIPCIONES_ACTIONS.edit.failed({ error }))
            )
          );
      })
    );
  });

  editInscripcionSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.edit.success),
      map(() => {
        this.router.navigate(['/inscripciones']);
        return emptyAction();
      })
    );
  });

  deleteInscripcionEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.delete.run),
      mergeMap(action => {
        return this.inscripcionesService.borrarInscripcionxId(action.id).pipe(
          map(inscripcion => {
            return inscripcion
              ? INSCRIPCIONES_ACTIONS.delete.success({
                  id: inscripcion.id,
                })
              : INSCRIPCIONES_ACTIONS.delete.failed({
                  error: new Error('Error al eliminar inscripcion'),
                });
          }),
          catchError(error =>
            of(INSCRIPCIONES_ACTIONS.delete.failed({ error }))
          )
        );
      })
    );
  });

  deleteInscripcionSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.delete.success),
      map(() => {
        return emptyAction();
      })
    );
  });

  selectInscripcionEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.select.run),
      mergeMap(action => {
        return this.inscripcionesService
          .seleccionarInscripcionxId(action.id)
          .pipe(
            map(inscripcion => {
              return inscripcion
                ? INSCRIPCIONES_ACTIONS.select.success({
                    inscripcion,
                  })
                : INSCRIPCIONES_ACTIONS.select.failed({
                    error: new Error('Error al seleccionar inscripcion'),
                  });
            }),
            catchError(error =>
              of(INSCRIPCIONES_ACTIONS.select.failed({ error }))
            )
          );
      })
    );
  });

  selectInscripcionSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.select.success),
      map(() => {
        return emptyAction();
      })
    );
  });

  inscripcionesxCursoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.loadxCurso.run),
      mergeMap(action => {
        return this.inscripcionesService
          .obtenerInscripcionesxCurso(action.idCurso, action.nombre)
          .pipe(
            map(inscripciones => {
              return inscripciones
                ? INSCRIPCIONES_ACTIONS.loadxCurso.success({
                    inscripciones,
                  })
                : INSCRIPCIONES_ACTIONS.loadxCurso.failed({
                    error: new Error('Error al cargar los inscripciones'),
                  });
            }),
            catchError(error =>
              of(INSCRIPCIONES_ACTIONS.loadxCurso.failed({ error }))
            )
          );
      })
    );
  });
  inscripcionesxAlumnoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(INSCRIPCIONES_ACTIONS.loadxAlumno.run),
      mergeMap(action => {
        return this.inscripcionesService
          .obtenerInscripcionesxAlumno(action.idAlumno, action.nombre)
          .pipe(
            map(inscripciones => {
              return inscripciones
                ? INSCRIPCIONES_ACTIONS.loadxAlumno.success({
                    inscripciones,
                  })
                : INSCRIPCIONES_ACTIONS.loadxAlumno.failed({
                    error: new Error('Error al cargar los inscripciones'),
                  });
            }),
            catchError(error =>
              of(INSCRIPCIONES_ACTIONS.loadxAlumno.failed({ error }))
            )
          );
      })
    );
  });
}
