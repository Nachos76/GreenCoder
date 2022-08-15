import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CommonService } from '@app/core/services/common.service';
import { ALUMNOS_ACTIONS } from '@app/store/actions/alumnos.actions';
import { ALUMNOS_SELECTORS } from '@app/store/selectors/alumnos.selectors';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.scss'],
})
export class FormularioAlumnoComponent implements OnInit {
  titulo: string = 'Ingresar nuevo alumno';
  destroy$: Subject<boolean> = new Subject<boolean>();
  loading$ = this.store.select(ALUMNOS_SELECTORS.selectGetAlumnosLoading);

  formularioAlumno = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required]],
    dni: [''],
    sexo: [''],
    fechaNacimiento: ['', [Validators.required, this.fechaValidator]],
    direccion: [''],
    telefono: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
      ],
    ],
    conocimientos: [[]],
    cursos: [['']],
    imagen: [''],
    descripcion: [''],
    estado: [''],
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
          if (id) this.store.dispatch(ALUMNOS_ACTIONS.select.run({ id }));
          else this.store.dispatch(ALUMNOS_ACTIONS.noSelect.run());
        }),
        switchMap(() => {
          return this.store.select(
            ALUMNOS_SELECTORS.selectGetAlumnoSeleccionado
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: alumno => {
          if (alumno) {
            this.formularioAlumno.patchValue(alumno);
            this.titulo = 'Editar alumno';
          } else {
            this.formularioAlumno.reset();
          }
        },
        error: error => {
          console.error(error);
        },
      });
  }

  fechaValidator(g: AbstractControl) {
    return new Date(g.value).getTime() < Date.now() ? null : { invalid: true };
  }

  cancelar() {
    this.common.navBack();
  }

  agregarAlumno(alumno: Alumno) {
    if (alumno.id) {
      //es usuario existente
      this.store.dispatch(ALUMNOS_ACTIONS.edit.run({ alumno }));
    } else {
      //es nuevo usuario
      alumno.estado = true;
      this.store.dispatch(ALUMNOS_ACTIONS.create.run({ alumno }));
    }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if (this.conocimientos?.value) {
        this.conocimientos?.value.push(value);
      } else {
        this.conocimientos?.setValue([value]);
      }
      this.conocimientos?.updateValueAndValidity();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(_conocimientos: string): void {
    const index = this.conocimientos?.value.indexOf(_conocimientos);

    if (index >= 0) {
      let conocimientosAux: string[] = Object.assign(
        [],
        this.conocimientos?.value
      );
      conocimientosAux.splice(index, 1); // where index = index of removed element
      this.conocimientos?.setValue(conocimientosAux);
      this.conocimientos?.updateValueAndValidity();
    }
  }

  // use getter method to access courseIds control value easily
  get conocimientos() {
    return this.formularioAlumno.get('conocimientos');
  }

  volver(): void {
    this.common.navBack();
  }
}
