import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, Subject, takeUntil, tap } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { Curso } from 'src/app/models/curso.model';
import { Alumno } from 'src/app/models/alumno.model';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { Store } from '@ngrx/store';
import { CommonService } from '@app/core/services/common.service';
import { INSCRIPCIONES_ACTIONS } from '@app/store/actions/inscripciones.actions';
import { INSCRIPCIONES_SELECTORS } from '@app/store/selectors/inscripciones.selectors';
@Component({
  templateUrl: './formulario-inscripciones.component.html',
  styleUrls: ['./formulario-inscripciones.component.scss'],
})
export class FormularioInscripcionesComponent implements OnInit {
  titulo: string = 'Ingresar nueva inscripción';
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading$ = this.store.select(
    INSCRIPCIONES_SELECTORS.selectGetInscripcionesLoading
  );

  formulario = this.fb.group({
    id: [''],
    curso: ['', [Validators.required]],
    alumno: ['', [Validators.required]],
    fecha: [''],
    estado: ['', [Validators.required]],
  });

  cursosOPT$!: Observable<Curso[]>;
  alumnosOPT$!: Observable<Alumno[]>;

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private activatedRoute: ActivatedRoute,
    private common: CommonService,
    private store: Store
  ) {
    this.cursosOPT$ = this.cursosService
      .obtenerCursos()
      .pipe(map(curso => curso));
    this.alumnosOPT$ = this.alumnosService
      .obtenerAlumnos()
      .pipe(map(alumno => alumno));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        tap(param => {
          let id = Number(param.get('id'));
          if (id) this.store.dispatch(INSCRIPCIONES_ACTIONS.select.run({ id }));
          else this.store.dispatch(INSCRIPCIONES_ACTIONS.noSelect.run());
        }),
        switchMap(() => {
          // return this.store.pipe(select(ALUMNOS_SELECTORS.selectGetAlumnoById(id)));
          return this.store.select(
            INSCRIPCIONES_SELECTORS.selectGetInscripcionSeleccionado
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: inscripcion => {
          if (inscripcion) {
            this.formulario.patchValue(inscripcion);
            this.titulo = 'Editar inscripción';
          } else {
            this.formulario.reset();
          }
        },
        error: error => {
          console.error(error);
        },
      });
  }

  compararxId(o1: any, o2: any) {
    return o1.id == o2.id;
  }

  cancelar() {
    this.common.navBack();
  }

  agregarInscripcion(inscripcion: Inscripcion) {
    inscripcion.cursoId = inscripcion.curso?.id;
    inscripcion.alumnoId = inscripcion.alumno?.id;
    if (inscripcion.id) {
      //es usuario existente
      this.store.dispatch(INSCRIPCIONES_ACTIONS.edit.run({ inscripcion }));
    } else {
      //es nuevo usuario
      this.store.dispatch(INSCRIPCIONES_ACTIONS.create.run({ inscripcion }));
    }
  }

  volver(): void {
    this.common.navBack();
  }
}
