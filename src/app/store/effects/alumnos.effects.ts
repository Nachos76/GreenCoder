import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from '@app/core/services/alumnos.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { ALUMNOS_ACTIONS } from '../actions/alumnos.actions';
import { emptyAction } from '../app.reducer';

@Injectable({ providedIn: 'root' })
export class AlumnosEffects {
  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService,
    private router: Router
  ) {}

  alumnosEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.load.run),
      mergeMap(action => {
        return this.alumnosService.obtenerAlumnos(action.nombre).pipe(
          map(alumnos => {
            return alumnos
              ? ALUMNOS_ACTIONS.load.success({
                  alumnos,
                })
              : ALUMNOS_ACTIONS.load.failed({
                  error: new Error('Error al cargar los alumnos'),
                });
          }),
          catchError(error => of(ALUMNOS_ACTIONS.load.failed({ error })))
        );
      })
    );
  });

  createAlumnoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.create.run),
      mergeMap(action => {
        return this.alumnosService.agregarAlumno(action.alumno).pipe(
          map(alumno => {
            return alumno
              ? ALUMNOS_ACTIONS.create.success({
                  alumno,
                })
              : ALUMNOS_ACTIONS.create.failed({
                  error: new Error('Error al crear el alumno'),
                });
          }),
          catchError(error => of(ALUMNOS_ACTIONS.create.failed({ error })))
        );
      })
    );
  });

  createAlumnoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.create.success),
      map(() => {
        this.router.navigate(['/alumnos']);
        return emptyAction();
      })
    );
  });

  editAlumnoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.edit.run),
      mergeMap(action => {
        return this.alumnosService.editarAlumno(action.alumno).pipe(
          map(alumno => {
            return alumno
              ? ALUMNOS_ACTIONS.edit.success({
                  alumno,
                })
              : ALUMNOS_ACTIONS.edit.failed({
                  error: new Error('Error al actualizar el perfil'),
                });
          }),
          catchError(error => of(ALUMNOS_ACTIONS.edit.failed({ error })))
        );
      })
    );
  });

  editAlumnoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.edit.success),
      map(() => {
        this.router.navigate(['/alumnos']);
        return emptyAction();
      })
    );
  });

  deleteAlumnoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.delete.run),
      mergeMap(action => {
        return this.alumnosService.borrarAlumnoxId(action.id).pipe(
          map(alumno => {
            return alumno
              ? ALUMNOS_ACTIONS.delete.success({
                  id: alumno.id,
                })
              : ALUMNOS_ACTIONS.delete.failed({
                  error: new Error('Error al eliminar alumno'),
                });
          }),
          catchError(error => of(ALUMNOS_ACTIONS.delete.failed({ error })))
        );
      })
    );
  });

  deleteAlumnoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.delete.success),
      map(() => {
        return emptyAction();
      })
    );
  });

  selectAlumnoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.select.run),
      mergeMap(action => {
        return this.alumnosService.seleccionarAlumnoxId(action.id).pipe(
          map(alumno => {
            return alumno
              ? ALUMNOS_ACTIONS.select.success({
                  alumno,
                })
              : ALUMNOS_ACTIONS.select.failed({
                  error: new Error('Error al seleccionar alumno'),
                });
          }),
          catchError(error => of(ALUMNOS_ACTIONS.select.failed({ error })))
        );
      })
    );
  });

  selectAlumnoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ALUMNOS_ACTIONS.select.success),
      map(() => {
        return emptyAction();
      })
    );
  });
}
