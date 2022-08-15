import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Roles } from 'src/app/models/roles.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { map, take } from 'rxjs';
import { AUTH_SELECTORS } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[appRolesPermitidos]',
})
export class RolesPermitidosDirective {
  @Input() roles!: Roles[];
  usuario$ = this.store.select(AUTH_SELECTORS.selectGetUsuario);
  constructor(
    renderer: Renderer2,
    private elementRef: ElementRef,
    private store: Store
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.style.display = 'none';
    this.validarAccesoxRol();
  }

  validarAccesoxRol() {
    this.usuario$
      .pipe(
        take(1),
        map((usuarioLogueado: Usuario | null) => {
          if (
            this.roles &&
            usuarioLogueado &&
            this.roles.indexOf(usuarioLogueado.rol) === -1
          ) {
            this.elementRef.nativeElement.style.display = 'none';
          } else this.elementRef.nativeElement.style.display = 'inline-block';
        })
      )
      .subscribe();
  }
}
