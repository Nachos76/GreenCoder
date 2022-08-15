import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { Roles } from 'src/app/models/roles.enum';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRoleGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  usuario$ = this.store.select(AUTH_SELECTORS.selectGetUsuario);
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    const roles = route.data['roles'] as Roles[];
    return this.usuario$.pipe(
      take(1),
      map((usuarioLogueado: Usuario | null) => {
        if (
          roles &&
          usuarioLogueado &&
          roles.indexOf(usuarioLogueado.rol) === -1
        ) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
