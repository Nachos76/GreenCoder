import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import { INSCRIPCIONES_ACTIONS } from '@app/store/actions/inscripciones.actions';
import { INSCRIPCIONES_SELECTORS } from '@app/store/selectors/inscripciones.selectors';
import { Store } from '@ngrx/store';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { Inscripcion } from '../../../models/inscripcion.model';

@Component({
  templateUrl: './detalle-inscripciones.component.html',
  styleUrls: ['./detalle-inscripciones.component.scss'],
})
export class DetalleInscripcionesComponent implements OnInit {
  titulo: string = 'Detalles de la inscripción';
  destroy$: Subject<boolean> = new Subject<boolean>();
  cursoSeleccionado$ = this.store.select(
    INSCRIPCIONES_SELECTORS.selectGetInscripcionSeleccionado
  );
  loading$ = this.store.select(
    INSCRIPCIONES_SELECTORS.selectGetInscripcionesLoading
  );
  inscripcionId!: number;

  susbcriptions: Subscription = new Subscription();
  inscripcion!: Inscripcion;

  defaultImagen: string = 'assets/logo/green-coder-logo.png';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private common: CommonService
  ) {}

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(param => {
          this.inscripcionId = Number(param['id']);
          this.store.dispatch(
            INSCRIPCIONES_ACTIONS.select.run({ id: this.inscripcionId })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  volver(): void {
    this.common.navBack();
  }

  reemplazarURL(str?: string | null) {
    return str?.replace('https://getavataaars.com/', 'https://avataaars.io/');
  }
}
