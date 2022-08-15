import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthUser } from '@app/models/auth.model';
import { Usuario } from '@app/models/usuario.model';
import { AUTH_ACTIONS } from '@app/store/actions/auth.actions';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading$ = this.store.select(AUTH_SELECTORS.selectGetAuthLoading);
  formulario = this.fb.group(
    {
      id: [''],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      rol: ['user', [Validators.required]],
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

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {}

  registrar(usuario: Usuario) {
    this.store.dispatch(AUTH_ACTIONS.CreateProfile.run({ usuario }));
  }

  passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
}
