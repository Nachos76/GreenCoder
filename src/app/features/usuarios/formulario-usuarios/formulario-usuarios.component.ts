import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import { USUARIOS_ACTIONS } from '@app/store/actions/usuarios.actions';
import { USUARIOS_SELECTORS } from '@app/store/selectors/usuarios.selectors';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil, switchMap, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.scss'],
})
export class FormularioUsuariosComponent implements OnInit {
  titulo: string = 'Ingresar nuevo usuario';
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuarioSeleccionado$ = this.store.select(
    USUARIOS_SELECTORS.selectGetUsuarioSeleccionado
  );
  loading$ = this.store.select(USUARIOS_SELECTORS.selectGetUsuariosLoading);

  formulario = this.fb.group(
    {
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
        ],
      ],
      imagen: [''],
      descripcion: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: [this.passwordMatchValidator] }
  );

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
          if (id) this.store.dispatch(USUARIOS_ACTIONS.select.run({ id }));
          else this.store.dispatch(USUARIOS_ACTIONS.noSelect.run());
        }),
        switchMap(params => {
          return this.store.select(
            USUARIOS_SELECTORS.selectGetUsuarioSeleccionado
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: usuario => {
          if (usuario) {
            this.formulario.patchValue(usuario);
            this.titulo = 'Editar usuario';
          } else {
            this.formulario.reset();
          }
        },
        error: error => {
          console.error(error);
        },
      });
  }

  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  cancelar() {
    this.common.navBack();
  }

  agregarUsuario(usuario: Usuario) {
    if (usuario.id) {
      //es usuario existente
      this.store.dispatch(USUARIOS_ACTIONS.edit.run({ usuario }));
    } else {
      //es nuevo usuario
      this.store.dispatch(USUARIOS_ACTIONS.create.run({ usuario }));
    }
  }

  volver(): void {
    this.common.navBack();
  }
}
