import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class SpanishMatPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = 'Primera página';
  itemsPerPageLabel = 'Registros por página:';
  lastPageLabel = 'Última página';
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Página 1 of 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return 'Página ' + (page + 1) + ' de ' + amountPages;
  }
}
