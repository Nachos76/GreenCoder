import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-leer-mas',
  templateUrl: './leer-mas.component.html',
  styleUrls: ['./leer-mas.component.scss'],
})
export class LeerMasComponent implements OnInit {
  @Input()
  texto!: string;
  expandir: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onExpandirClicked(event: MouseEvent) {
    this.expandir = !this.expandir;
    event.stopPropagation();
  }
}
