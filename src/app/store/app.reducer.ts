import { ActionReducerMap, createAction } from '@ngrx/store';
import { IAppState } from './app.state';
import { authReducer } from './reducers/auth.reducer';

export const appReducers: ActionReducerMap<IAppState> = {
  auth: authReducer,
};

export const emptyAction = createAction('Accion vacia');
