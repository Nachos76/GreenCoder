import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { USUARIOS_ACTIONS } from '@app/store/actions/usuarios.actions';
import { USUARIOS_SELECTORS } from '@app/store/selectors/usuarios.selectors';
import { Store } from '@ngrx/store';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss'],
})
export class ListadoUsuariosComponent implements OnInit {
  titulo: string = 'Listado de Usuarios';
  displayedColumnsTable = ['id', 'nombre', 'email', 'rol', 'actions'];
  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Usuario>([]);
  loading$ = this.store.select(USUARIOS_SELECTORS.selectGetUsuariosLoading);

  tableDataSource$ = this.store
    .select(USUARIOS_SELECTORS.selectGetUsuarios)
    .pipe(
      map(usuarios => {
        this.dataSource = new MatTableDataSource<Usuario>(usuarios);
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
    this.obtenerUsuarios();
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
        this.obtenerUsuarios(nombre);
      });
  }

  obtenerUsuarios(nombre?: string) {
    this.store.dispatch(USUARIOS_ACTIONS.load.run({ nombre }));
  }

  seleccionarUsuario(id: number) {
    this.router.navigate(['/usuarios/detalle/' + id]);
  }

  eliminarUsuario(item: Usuario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el usuario  ' +
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
        this.store.dispatch(USUARIOS_ACTIONS.delete.run({ id: item.id }));
      }
    });
  }

  editarUsuario(id?: number) {
    this.router.navigate(['/usuarios/form-usuarios/' + id]);
  }

  agregarUsuario() {
    this.router.navigate(['/usuarios/form-usuarios']);
  }
}
