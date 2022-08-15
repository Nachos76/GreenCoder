import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core/services/common.service';
import { CURSOS_ACTIONS } from '@app/store/actions/cursos.actions';
import { INSCRIPCIONES_ACTIONS } from '@app/store/actions/inscripciones.actions';
import { CURSOS_SELECTORS } from '@app/store/selectors/cursos.selectors';
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
  templateUrl: './detalle-cursos.component.html',
  styleUrls: ['./detalle-cursos.component.scss'],
})
export class DetalleCursosComponent implements OnInit {
  titulo: string = 'Detalle del curso';
  destroy$: Subject<boolean> = new Subject<boolean>();
  cursoSeleccionado$ = this.store.select(
    CURSOS_SELECTORS.selectGetCursoSeleccionado
  );
  loading$ = this.store.select(CURSOS_SELECTORS.selectGetCursosLoading);
  cursoId!: number;
  loadedAlumno$ = this.store.select(
    INSCRIPCIONES_SELECTORS.selectGetInscripcionesLoaded
  );

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumnsTable = ['id', 'nombre', 'actions'];
  // tableDataSource$: Observable<MatTableDataSource<Inscripcion>> | undefined;
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
              return item.alumno?.nombre;
            default:
              return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return this.dataSource;
      })
    );
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
          this.cursoId = Number(param['id']);
          this.store.dispatch(CURSOS_ACTIONS.select.run({ id: this.cursoId }));
        }),
        tap(() => {
          this.obtenerAlumnos(this.cursoId);
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
        this.obtenerAlumnos(this.cursoId, nombre);
      });
  }

  volver(): void {
    //this.router.navigate(['/cursos']);
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

  obtenerAlumnos(idCurso: number, nombre?: string) {
    this.store.dispatch(
      INSCRIPCIONES_ACTIONS.loadxCurso.run({ idCurso, nombre })
    );
  }
}
