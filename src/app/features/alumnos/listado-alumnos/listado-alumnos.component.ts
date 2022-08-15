import { Alumno } from './../../../models/alumno.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ALUMNOS_SELECTORS } from '@app/store/selectors/alumnos.selectors';
import { ALUMNOS_ACTIONS } from '@app/store/actions/alumnos.actions';
import { Roles } from '@app/models/roles.enum';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss'],
})
export class ListadoAlumnosComponent implements OnInit {
  titulo: string = 'Listado de Alumnos';
  displayedColumnsTable = [
    'id',
    'nombre',
    'edad',
    'fechaNacimiento',
    'conocimientos',
    'cursos',
    'estado',
    'actions',
  ];

  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Alumno>([]);
  loading$ = this.store.select(ALUMNOS_SELECTORS.selectGetAlumnosLoading);

  tableDataSource$ = this.store.select(ALUMNOS_SELECTORS.selectGetAlumnos).pipe(
    map(alumnos => {
      this.dataSource = new MatTableDataSource<Alumno>(alumnos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return this.dataSource;
    })
  );
  roles = Roles;
  usuario$ = this.store.select(AUTH_SELECTORS.selectGetUsuario);
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {
    this.obtenerAlumnos();
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
        this.obtenerAlumnos(nombre);
      });
  }

  agregar() {
    this.router.navigate(['/alumnos/form']);
  }

  seleccionar(id: number) {
    this.router.navigate(['/alumnos/detalle/' + id]);
  }

  eliminar(item: Alumno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el alumno   ' +
        item?.nombre +
        ' ' +
        item?.apellido,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(ALUMNOS_ACTIONS.delete.run({ id: item.id }));
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/alumnos/form/' + id]);
  }

  obtenerAlumnos(nombre?: string) {
    this.store.dispatch(ALUMNOS_ACTIONS.load.run({ nombre }));
  }
}
