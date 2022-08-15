import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import { USUARIOS_ACTIONS } from '@app/store/actions/usuarios.actions';
import { USUARIOS_SELECTORS } from '@app/store/selectors/usuarios.selectors';
import { Store } from '@ngrx/store';
import { Subject, tap, takeUntil } from 'rxjs';

@Component({
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.scss'],
})
export class DetalleUsuariosComponent implements OnInit {
  titulo: string = 'Detalles del usuario';
  destroy$: Subject<boolean> = new Subject<boolean>();
  usuarioSeleccionado$ = this.store.select(
    USUARIOS_SELECTORS.selectGetUsuarioSeleccionado
  );
  loading$ = this.store.select(USUARIOS_SELECTORS.selectGetUsuariosLoading);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private common: CommonService
  ) {}

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(param => {
          let id = Number(param['id']);
          this.store.dispatch(USUARIOS_ACTIONS.select.run({ id }));
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  volver(): void {
    this.common.navBack();
  }
}
