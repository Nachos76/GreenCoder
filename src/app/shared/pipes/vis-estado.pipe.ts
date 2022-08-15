import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visEstado',
})
export class VisEstadoPipe implements PipeTransform {
  transform(
    estado: number | boolean | null | undefined
  ): string | null | undefined {
    switch (estado) {
      case 1:
        return 'Activo';
      case 0:
        return 'No Activo';
      case true:
        return 'Activo';
      case false:
        return 'No Activo';

      default:
        return estado?.toString();
    }
  }
}
