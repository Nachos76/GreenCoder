import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AUTH_ACTIONS } from '@app/store/actions/auth.actions';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotpassComponent implements OnInit {
  loading$ = this.store.select(AUTH_SELECTORS.selectGetAuthLoading);
  tempPassword$ = this.store.select(AUTH_SELECTORS.selectGetTempPassword);
  mensajeError$ = this.store.select(AUTH_SELECTORS.selectGetErrorMessage);
  formulario = this.fb.group({
    email: [
      'admin@greencoder.com',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ],
    ],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario.reset();
  }

  recordar(email: string) {
    this.store.dispatch(AUTH_ACTIONS.Forgot.run({ email }));
  }
}
