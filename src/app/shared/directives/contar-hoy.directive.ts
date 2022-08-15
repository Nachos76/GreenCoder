import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appContarHoy]',
})
export class ContarHoyDirective implements OnInit {
  @Input() fn!: string | undefined;

  constructor(renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnInit() {
    this.elementRef.nativeElement.textContent = this.calcularEdad(this.fn);
  }

  calcularEdad(fn: string | undefined) {
    if (fn) {
      let timeDiff = Math.abs(Date.now() - Date.parse(fn));
      let edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      return edad;
    } else return;
  }
}
