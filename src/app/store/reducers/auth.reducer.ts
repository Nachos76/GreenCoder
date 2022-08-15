import { createReducer, on } from '@ngrx/store';
import { AUTH_ACTIONS } from '../actions/auth.actions';
import { initialAuthState } from '../states/auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(AUTH_ACTIONS.Login.run, state => {
    return {
      ...state,
      loading: true,
      tempPassword: null,
    };
  }),
  on(AUTH_ACTIONS.Login.success, (state, { usuario, token, recordarme }) => {
    return {
      ...state,
      loading: false,
      usuario,
      token,
      recordarme,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
      tempPassword: null,
    };
  }),
  on(AUTH_ACTIONS.Login.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(AUTH_ACTIONS.Logout.run, state => {
    return {
      ...state,
      token: null,
      usuario: null,
      recordarme: false,
      hasError: false,
      errorMessage: null,
      loggedIn: false,
      loading: false,
    };
  }),
  on(AUTH_ACTIONS.EditProfile.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AUTH_ACTIONS.EditProfile.success, (state, { usuario }) => {
    return {
      ...state,
      usuario,
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(AUTH_ACTIONS.EditProfile.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  }),
  on(AUTH_ACTIONS.Forgot.run, state => {
    return {
      ...state,
      loading: true,
      tempPassword: null,
    };
  }),
  on(AUTH_ACTIONS.Forgot.success, (state, { tempPassword }) => {
    return {
      ...state,
      loading: false,
      tempPassword,
      hasError: false,
      errorMessage: null,
    };
  }),
  on(AUTH_ACTIONS.Forgot.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
      tempPassword: null,
    };
  }),
  on(AUTH_ACTIONS.CreateProfile.run, state => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(AUTH_ACTIONS.CreateProfile.success, (state, { usuario }) => {
    return {
      ...state,
      usuario,
      loading: false,
      hasError: false,
      errorMessage: null,
      loggedIn: true,
    };
  }),
  on(AUTH_ACTIONS.CreateProfile.failed, (state, { error }) => {
    return {
      ...state,
      errorMessage: error.message,
      hasError: true,
      loading: false,
    };
  })
);
