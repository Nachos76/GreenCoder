import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '@app/models/usuario.model';
import { CommonService } from '@app/core/services/common.service';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AUTH_ACTIONS } from '@app/store/actions/auth.actions';

@Component({
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  titulo: string = 'Editar perfil de usuario';
  usuarioLogueado$ = this.store.select(AUTH_SELECTORS.selectGetUsuario);
  loading$ = this.store.select(AUTH_SELECTORS.selectGetAuthLoading);
  destroy$: Subject<boolean> = new Subject<boolean>();
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
    private common: CommonService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.usuarioLogueado$
      .pipe(
        // take(1),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: usuario => {
          if (usuario) {
            this.formulario.patchValue(usuario);
          } else {
            this.formulario.reset();
          }
        },
        error: error => {
          console.error(error);
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  passwordMatchValidator(g: AbstractControl) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  cancelar() {
    this.common.navBack();
  }

  volver(): void {
    this.common.navBack();
  }

  agregarUsuario(usuario: Usuario) {
    this.store.dispatch(AUTH_ACTIONS.EditProfile.run({ usuario }));
  }
}
