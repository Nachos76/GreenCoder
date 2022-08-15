import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import { ALUMNOS_ACTIONS } from '@app/store/actions/alumnos.actions';
import { INSCRIPCIONES_ACTIONS } from '@app/store/actions/inscripciones.actions';
import { ALUMNOS_SELECTORS } from '@app/store/selectors/alumnos.selectors';
import { INSCRIPCIONES_SELECTORS } from '@app/store/selectors/inscripciones.selectors';
import { Store } from '@ngrx/store';
import {
  map,
  Subject,
  takeUntil,
  tap,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.scss'],
})
export class DetalleAlumnoComponent implements OnInit {
  titulo: string = 'Detalles del alumno';
  destroy$: Subject<boolean> = new Subject<boolean>();
  alumnoSeleccionado$ = this.store.select(
    ALUMNOS_SELECTORS.selectGetAlumnoSeleccionado
  );
  loading$ = this.store.select(ALUMNOS_SELECTORS.selectGetAlumnosLoading);
  alumnoId!: number;
  loadedCurso$ = this.store.select(
    INSCRIPCIONES_SELECTORS.selectGetInscripcionesLoaded
  );

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumnsTable = ['id', 'nombre', 'fechaInicio', 'actions'];

  buscador = new FormControl();
  dataSource = new MatTableDataSource<Inscripcion>([]);
  tableDataSource$ = this.store
    .select(INSCRIPCIONES_SELECTORS.selectGetInscripciones)
    .pipe(
      map(inscripciones => {
        this.dataSource = new MatTableDataSource<Inscripcion>(inscripciones);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'nombre':
              return item.curso?.nombre;
            case 'fechaInicio':
              return item.curso?.fechaInicio;
            default:
              return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.dataSource;
      })
    );
  defaultImagen: string = 'assets/avatars/avatar.png';

  constructor(
    private dialog: MatDialog,
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
          this.alumnoId = Number(param['id']);
          this.store.dispatch(
            ALUMNOS_ACTIONS.select.run({ id: this.alumnoId })
          );
        }),
        tap(() => {
          this.obtenerCursos(this.alumnoId);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.buscador.valueChanges
      .pipe(
        filter(res => res.length > 2 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((nombre: string) => {
        this.obtenerCursos(this.alumnoId, nombre);
      });
  }

  reemplazarURL(str?: string | null) {
    return str?.replace('https://getavataaars.com/', 'https://avataaars.io/');
  }

  volver(): void {
    //this.router.navigate(['/alumnos']);
    this.common.navBack();
  }

  eliminar(item: Inscripcion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de ' +
        item?.alumno?.nombre +
        ' ' +
        item?.alumno?.apellido +
        ' del curso ' +
        item?.curso?.nombre,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(INSCRIPCIONES_ACTIONS.delete.run({ id: item.id }));
      }
    });
  }

  obtenerCursos(idAlumno: number, nombre?: string) {
    this.store.dispatch(
      INSCRIPCIONES_ACTIONS.loadxAlumno.run({ idAlumno, nombre })
    );
  }
}
