import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ThemeMode } from 'src/app/theme/models/theme.enum';
import { ThemeService } from 'src/app/theme/services/theme.service';
import { Theme } from 'src/app/theme/models/theme.model';
import { Roles } from 'src/app/models/roles.enum';
import { AUTH_ACTIONS } from '@app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output()
  toggleSidenav = new EventEmitter<any>();
  usuarioLogueado$ = this.store.select(AUTH_SELECTORS.selectGetUsuario);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ThemeMode = ThemeMode;
  currentTheme: Theme;
  roles = Roles;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private themeService: ThemeService,
    private store: Store
  ) {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit(): void {}

  toggle() {
    this.toggleSidenav.emit(true);
  }

  navegarA(ruta: string) {
    this.router.navigate(['/' + ruta]);
  }

  editarPerfil() {
    this.navegarA('/perfil');
  }

  changeThemeMode(themeMode: ThemeMode) {
    this.themeService.changeThemeMode(
      themeMode == ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK,
      themeMode
    );
  }

  salir() {
    this.store.dispatch(AUTH_ACTIONS.Logout.run());
  }
}
