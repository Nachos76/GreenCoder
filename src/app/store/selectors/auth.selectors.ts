import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../states/auth.state';

const selectAuthState = createFeatureSelector<IAuthState>('auth');
const selectGetUsuario = createSelector(
  selectAuthState,
  state => state.usuario
);
const selectGetAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);
const selectGetAuthRecordarme = createSelector(
  selectAuthState,
  state => state.recordarme
);

const selectGetAuthLoggedIn = createSelector(
  selectAuthState,
  state => state.loggedIn
);

const selectGetTempPassword = createSelector(
  selectAuthState,
  state => state.tempPassword
);

const selectGetErrorMessage = createSelector(
  selectAuthState,
  state => state.errorMessage
);

export const AUTH_SELECTORS = {
  selectGetUsuario,
  selectGetAuthLoading,
  selectGetAuthRecordarme,
  selectGetAuthLoggedIn,
  selectGetTempPassword,
  selectGetErrorMessage,
};
