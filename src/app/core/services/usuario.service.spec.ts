import { TestBed } from '@angular/core/testing';
import { Usuario } from '@app/models/usuario.model';
import { environment } from '../../../environments/environment';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { MockModule } from 'ng-mocks';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { Roles } from '@app/models/roles.enum';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('UsuarioService', () => {
  let service: UsuarioService;
  let httpController: HttpTestingController;
  const mockResp: Usuario[] = [];
  const mockResp2: Usuario = {
    nombre: 'Demo',
    apellido: 'Admin',
    email: 'admin@greencoder.com',
    password: '123Pass.',
    confirmPassword: '123Pass.',
    rol: Roles.ADMIN,
    estado: 1,
    imagen:
      'https://getavataaars.com/?accessoriesType=Blank&avatarStyle=Circle&clotheColor=Blue02&clotheType=Overall&eyeType=Dizzy&eyebrowType=UpDown&facialHairColor=Black&facialHairType=BeardLight&hairColor=Brown&mouthType=Sad&skinColor=Yellow&topType=Turban',
    descripcion: '',
    fechaAlta: '2022-07-14T09:06:57.185Z',
    id: 4,
  };

  const id = 4;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(HttpClientModule),
        HttpClientTestingModule,
        MockModule(CommonModule),
        RouterTestingModule,
      ],
      providers: [],
    });
    service = TestBed.inject(UsuarioService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Obtener usuarios', () => {
    service.obtenerUsuarios().subscribe(usuarios => {
      expect(usuarios).toEqual(mockResp);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: environment.urlAPI + 'usuarios',
    });
    req.flush(mockResp);
  });

  it('Obtener de usuarios con filtro', () => {
    const filtro = 'nacho';
    service.obtenerUsuarios(filtro).subscribe(usuarios => {
      expect(usuarios).toEqual(mockResp);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: environment.urlAPI + 'usuarios?search=' + filtro,
    });
    req.flush(mockResp);
  });

  it('Obtener  usuario', () => {
    service.seleccionarUsuarioxId(id).subscribe(usuario => {
      expect(usuario).toEqual(mockResp2);
    });
    const req = httpController.expectOne({
      method: 'GET',
    });
    req.flush(mockResp2);
  });

  it('Agregar usuario', () => {
    var dataObj = JSON.stringify(mockResp2);
    const params = new HttpParams().append('data', dataObj);

    service.agregarUsuario(mockResp2).subscribe(usuario => {
      expect(usuario).toEqual(mockResp2);
    });
    const req = httpController.expectOne({
      method: 'POST',
    });

    req.flush(mockResp2);
  });

  it('Editar usuario', () => {
    service.editarUsuario(mockResp2).subscribe(usuario => {
      expect(usuario).toEqual(mockResp2);
    });
    const req = httpController.expectOne({
      method: 'PUT',
    });
    req.flush(mockResp2);
  });

  it('Borrar usuario', () => {
    service.borrarUsuarioxId(id).subscribe(usuario => {
      expect(usuario).toEqual(mockResp2);
    });
    const req = httpController.expectOne({
      method: 'DELETE',
    });
    req.flush(mockResp2);
  });
});
