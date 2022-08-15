import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlAPI = environment.urlAPI;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private commonService: CommonService) {}

  obtenerUsuarios(nombre?: string) {
    return this.http
      .get<Usuario[]>(
        this.urlAPI + 'usuarios' + (nombre ? '?search=' + nombre : '')
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  seleccionarUsuarioxId(id: number): Observable<Usuario> {
    return this.http
      .get<Usuario>(this.urlAPI + 'usuarios/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  borrarUsuarioxId(id: number) {
    return this.http
      .delete<Usuario>(this.urlAPI + 'usuarios/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  editarUsuario(usuario: Usuario) {
    return this.http
      .put<Usuario>(
        this.urlAPI + 'usuarios/' + usuario.id,
        JSON.stringify(usuario),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  agregarUsuario(usuario: Usuario) {
    return this.http
      .post<Usuario>(
        this.urlAPI + 'usuarios',
        JSON.stringify(usuario),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }
}
