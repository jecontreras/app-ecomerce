import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado : any = [];
  listhome: any = [];
  constructor() {
    this.listado = [
      {
        titulo: 'Card Title',
        subtitulo: 'Card Subtitle',
        img: '../../assets/imagenes/product.jpg',
        content: `$2000`
      },
    ];
    this.listhome = [
      {
        titulo: 'Productos Principales',
        listado: this.listado,
      },
      {
        titulo: 'Productos Secundarios',
        listado: this.listado,
      },
      {
        titulo: 'Productos Tersarios',
        listado: this.listado,
      },
    ]

  }

}
