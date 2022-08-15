import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Roles } from '@app/models/roles.enum';
import { INSCRIPCIONES_ACTIONS } from '@app/store/actions/inscripciones.actions';
import { INSCRIPCIONES_SELECTORS } from '@app/store/selectors/inscripciones.selectors';
import { Store } from '@ngrx/store';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss'],
})
export class ListadoInscripcionesComponent implements OnInit {
  titulo: string = 'Listado de Inscripciones';
  displayedColumnsTable = [
    'id',
    'alumno',
    'curso',
    'fecha',
    'estado',
    'actions',
  ];
  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Inscripcion>([]);
  loading$ = this.store.select(
    INSCRIPCIONES_SELECTORS.selectGetInscripcionesLoading
  );
  roles = Roles;
  tableDataSource$ = this.store
    .select(INSCRIPCIONES_SELECTORS.selectGetInscripciones)
    .pipe(
      map(inscripciones => {
        this.dataSource = new MatTableDataSource<Inscripcion>(inscripciones);
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'alumno':
              return item.alumno?.nombre + '' + item.alumno?.apellido;
            case 'curso':
              return item.curso?.nombre;
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
    private router: Router,
    private store: Store
  ) {
    this.obtenerInscripciones();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  ngOnInit(): void {
    this.buscador.valueChanges
      .pipe(
        filter(res => res.length > 2 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((nombre: string) => {
        this.obtenerInscripciones(nombre);
      });
  }

  obtenerInscripciones(nombre?: string) {
    this.store.dispatch(INSCRIPCIONES_ACTIONS.load.run({ nombre }));
  }

  agregar() {
    this.router.navigate(['/inscripciones/form']);
  }

  seleccionar(id: number) {
    this.router.navigate(['/inscripciones/detalle/' + id]);
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

  editar(id: number) {
    this.router.navigate(['/inscripciones/form/' + id]);
  }
}
