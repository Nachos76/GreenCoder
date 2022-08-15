import { Observable, map, catchError, tap, retry } from 'rxjs';
import { AuthUser } from 'src/app/models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from 'src/app/models/roles.enum';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlAPI = 'https://62ce1cb7066bd2b6992ffea7.mockapi.io/api/v1/';

  fakeUsuarioAdmin: Usuario = {
    id: 4,
    nombre: 'Demo',
    apellido: 'Admin',
    email: 'admin@greencoder.com',
    password: '123Pass.',
    confirmPassword: '123Pass.',
    rol: Roles.ADMIN,
    estado: 1, //activo
    imagen: '',
    descripcion: '',
    fechaAlta: '',
  };

  fakeUsuario: Usuario = {
    id: 2,
    nombre: 'Juan',
    apellido: 'Usuario',
    email: 'usuario@greencoder.com',
    password: '123Pass.',
    confirmPassword: '123Pass.',
    rol: Roles.USER,
    estado: 1, //activo
    imagen: '',
    descripcion: '',
    fechaAlta: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService
  ) {}

  login(authUser: AuthUser): Observable<Usuario | null> {
    return this.http
      .get<Usuario[]>(
        this.urlAPI +
          'usuarios?p=1&l=1&email=' +
          authUser.email +
          '&password=' +
          authUser.password
      )
      .pipe(
        tap(usuarios => usuarios.push(this.fakeUsuarioAdmin)),
        tap(usuarios => usuarios.push(this.fakeUsuario)),
        map(usuarios => {
          return (
            usuarios.find(
              (usuario: Usuario) =>
                usuario.email === authUser.email &&
                usuario.password === authUser.password
            ) || null
          );
        }),
        catchError(this.commonService.errorHandler)
      );
  }

  recuperarPass(email: string): Observable<string | null> {
    return this.http
      .get<Usuario[]>(this.urlAPI + 'usuarios?p=1&l=1&email=' + email)
      .pipe(
        map(usuarios => {
          return (
            usuarios.find((usuario: Usuario) => usuario.email === email) || null
          );
        }),
        map(usuario => {
          return usuario?.password || null;
        }),
        catchError(this.commonService.errorHandler)
      );
  }

  agregarUsuario(usuario: Usuario) {
    return this.http
      .post<Usuario>(this.urlAPI + 'usuarios', JSON.stringify(usuario))
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }
}
