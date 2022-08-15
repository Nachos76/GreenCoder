/* eslint-disable no-unused-vars */
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/models/auth.model';
import { Component } from '@angular/core';
import { AUTH_ACTIONS } from '@app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usuario$ = this.store.select(AUTH_SELECTORS.selectGetUsuario);
  loading$ = this.store.select(AUTH_SELECTORS.selectGetAuthLoading);
  recordarme$ = this.store.select(AUTH_SELECTORS.selectGetAuthLoading);

  formulario = this.fb.group({
    email: [
      'admin@greencoder.com',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
    password: ['123Pass.', Validators.required],
    recordarme: ['true'],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  autenticar(authUser: AuthUser) {
    this.store.dispatch(AUTH_ACTIONS.Login.run({ authUser }));
  }
}
