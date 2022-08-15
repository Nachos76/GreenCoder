import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { environment } from '@environments/environment';
import { Curso } from 'src/app/models/curso.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private urlAPI = environment.urlAPI;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private commonService: CommonService) {}

  obtenerCursos(nombre?: string) {
    return this.http
      .get<Curso[]>(
        this.urlAPI + 'cursos' + (nombre ? '?search=' + nombre : '')
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  seleccionarCursoxId(id: number): Observable<Curso> {
    return this.http
      .get<Curso>(this.urlAPI + 'cursos/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  borrarCursoxId(id: number) {
    return this.http
      .delete<Curso>(this.urlAPI + 'cursos/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  editarCurso(curso: Curso) {
    return this.http
      .put<Curso>(
        this.urlAPI + 'cursos/' + curso.id,
        JSON.stringify(curso),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  agregarCurso(curso: Curso) {
    return this.http
      .post<Curso>(
        this.urlAPI + 'cursos',
        JSON.stringify(curso),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }
}
