import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { Alumno } from 'src/app/models/alumno.model';
import { environment } from '@environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private urlAPI = environment.urlAPI;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private commonService: CommonService) {}

  obtenerAlumnos(nombre?: string) {
    return this.http
      .get<Alumno[]>(
        this.urlAPI + 'alumnos' + (nombre ? '?search=' + nombre : '')
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  seleccionarAlumnoxId(id: number): Observable<Alumno> {
    return this.http
      .get<Alumno>(this.urlAPI + 'alumnos/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  borrarAlumnoxId(id: number) {
    return this.http
      .delete<Alumno>(this.urlAPI + 'alumnos/' + id)
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  editarAlumno(alumno: Alumno) {
    return this.http
      .put<Alumno>(
        this.urlAPI + 'alumnos/' + alumno.id,
        JSON.stringify(alumno),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }

  agregarAlumno(alumno: Alumno) {
    return this.http
      .post<Alumno>(
        this.urlAPI + 'alumnos',
        JSON.stringify(alumno),
        this.httpOptions
      )
      .pipe(retry(3), catchError(this.commonService.errorHandler));
  }
}
