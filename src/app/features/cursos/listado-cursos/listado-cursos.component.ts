import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Roles } from '@app/models/roles.enum';
import { CURSOS_ACTIONS } from '@app/store/actions/cursos.actions';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';
import { CURSOS_SELECTORS } from '@app/store/selectors/cursos.selectors';
import { Store } from '@ngrx/store';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss'],
})
export class ListadoCursosComponent implements OnInit {
  titulo: string = 'Listado de Cursos';
  displayedColumnsTable = [
    'id',
    'nombre',
    'descripcion',
    'cantClases',
    'capacidad',
    'fechaInicio',
    'estado',
    'actions',
  ];
  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Curso>([]);
  loading$ = this.store.select(CURSOS_SELECTORS.selectGetCursosLoading);

  tableDataSource$ = this.store.select(CURSOS_SELECTORS.selectGetCursos).pipe(
    map(cursos => {
      this.dataSource = new MatTableDataSource<Curso>(cursos);
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
    this.obtenerCursos();
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
        this.obtenerCursos(nombre);
      });
  }

  agregar() {
    this.router.navigate(['/cursos/form']);
  }

  seleccionar(id: number) {
    this.router.navigate(['/cursos/detalle/' + id]);
  }

  eliminar(item: Curso) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message: 'Esta seguro que desea eliminar el registro de  ' + item?.nombre,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(CURSOS_ACTIONS.delete.run({ id: item.id }));
      }
    });
  }

  obtenerCursos(nombre?: string) {
    this.store.dispatch(CURSOS_ACTIONS.load.run({ nombre }));
  }

  editar(id: number) {
    this.router.navigate(['/cursos/form/' + id]);
  }
}
