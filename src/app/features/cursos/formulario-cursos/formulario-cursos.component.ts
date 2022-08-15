import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import { CURSOS_ACTIONS } from '@app/store/actions/cursos.actions';
import { CURSOS_SELECTORS } from '@app/store/selectors/cursos.selectors';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';

@Component({
  templateUrl: './formulario-cursos.component.html',
  styleUrls: ['./formulario-cursos.component.scss'],
})
export class FormularioCursosComponent implements OnInit {
  titulo: string = 'Ingresar nuevo curso';
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading$ = this.store.select(CURSOS_SELECTORS.selectGetCursosLoading);

  formulario = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    fechaInicio: ['', [Validators.required, this.fechaValidator]],
    cantClases: ['', [Validators.required, Validators.min(1)]],
    precio: ['', [Validators.required, Validators.min(1)]],
    capacidad: ['', [Validators.required, Validators.min(1)]],
    estado: ['', [Validators.required]],
    descripcion: [''],
    imagen: [''],
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private common: CommonService,
    private store: Store
  ) {}

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
          if (id) this.store.dispatch(CURSOS_ACTIONS.select.run({ id }));
          else this.store.dispatch(CURSOS_ACTIONS.noSelect.run());
        }),
        switchMap(() => {
          return this.store.select(CURSOS_SELECTORS.selectGetCursoSeleccionado);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: curso => {
          if (curso) {
            this.formulario.patchValue(curso);
            this.titulo = 'Editar alumno';
          } else {
            this.formulario.reset();
          }
        },
        error: error => {
          console.error(error);
        },
      });
  }
  cancelar() {
    this.common.navBack();
  }

  agregar(curso: Curso) {
    if (curso.id) {
      //es usuario existente
      this.store.dispatch(CURSOS_ACTIONS.edit.run({ curso }));
    } else {
      //es nuevo usuario
      this.store.dispatch(CURSOS_ACTIONS.create.run({ curso }));
    }
  }

  volver(): void {
    this.common.navBack();
  }

  fechaValidator(g: AbstractControl) {
    return new Date(g.value).getTime() > Date.now() ? null : { invalid: true };
  }
}
