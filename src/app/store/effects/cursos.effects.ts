import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from '@app/core/services/cursos.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { CURSOS_ACTIONS } from '../actions/cursos.actions';
import { emptyAction } from '../app.reducer';

@Injectable({ providedIn: 'root' })
export class CursosEffects {
  constructor(
    private actions$: Actions,
    private cursosService: CursosService,
    private router: Router
  ) {}

  cursosEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.load.run),
      mergeMap(action => {
        return this.cursosService.obtenerCursos(action.nombre).pipe(
          map(cursos => {
            return cursos
              ? CURSOS_ACTIONS.load.success({
                  cursos,
                })
              : CURSOS_ACTIONS.load.failed({
                  error: new Error('Error al cargar los cursos'),
                });
          }),
          catchError(error => of(CURSOS_ACTIONS.load.failed({ error })))
        );
      })
    );
  });

  createCursoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.create.run),
      mergeMap(action => {
        return this.cursosService.agregarCurso(action.curso).pipe(
          map(curso => {
            return curso
              ? CURSOS_ACTIONS.create.success({
                  curso,
                })
              : CURSOS_ACTIONS.create.failed({
                  error: new Error('Error al crear el curso'),
                });
          }),
          catchError(error => of(CURSOS_ACTIONS.create.failed({ error })))
        );
      })
    );
  });

  createCursoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.create.success),
      map(() => {
        this.router.navigate(['/cursos']);
        return emptyAction();
      })
    );
  });

  editCursoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.edit.run),
      mergeMap(action => {
        return this.cursosService.editarCurso(action.curso).pipe(
          map(curso => {
            return curso
              ? CURSOS_ACTIONS.edit.success({
                  curso,
                })
              : CURSOS_ACTIONS.edit.failed({
                  error: new Error('Error al actualizar el perfil'),
                });
          }),
          catchError(error => of(CURSOS_ACTIONS.edit.failed({ error })))
        );
      })
    );
  });

  editCursoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.edit.success),
      map(() => {
        this.router.navigate(['/cursos']);
        return emptyAction();
      })
    );
  });

  deleteCursoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.delete.run),
      mergeMap(action => {
        return this.cursosService.borrarCursoxId(action.id).pipe(
          map(curso => {
            return curso
              ? CURSOS_ACTIONS.delete.success({
                  id: curso.id,
                })
              : CURSOS_ACTIONS.delete.failed({
                  error: new Error('Error al eliminar curso'),
                });
          }),
          catchError(error => of(CURSOS_ACTIONS.delete.failed({ error })))
        );
      })
    );
  });

  deleteCursoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.delete.success),
      map(() => {
        return emptyAction();
      })
    );
  });

  selectCursoEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.select.run),
      mergeMap(action => {
        return this.cursosService.seleccionarCursoxId(action.id).pipe(
          map(curso => {
            return curso
              ? CURSOS_ACTIONS.select.success({
                  curso,
                })
              : CURSOS_ACTIONS.select.failed({
                  error: new Error('Error al seleccionar curso'),
                });
          }),
          catchError(error => of(CURSOS_ACTIONS.select.failed({ error })))
        );
      })
    );
  });

  selectCursoSuccessEffets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CURSOS_ACTIONS.select.success),
      map(() => {
        return emptyAction();
      })
    );
  });
}
