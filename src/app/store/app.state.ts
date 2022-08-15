import { IAuthState, initialAuthState } from './states/auth.state';

export interface IAppState {
  auth: IAuthState;
}

export const initialAppState: IAppState = {
  auth: initialAuthState,
};
