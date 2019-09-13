import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado : any = [];
  constructor() {
    this.listado = [
      {
        titulo: 'Card Title',
        subtitulo: 'Card Subtitle',
        img: 'assets/imagenes/product.jpg',
        content: `$2000`
      },
      {
        titulo: 'Card Title',
        subtitulo: 'Card Subtitle',
        img: 'assets/imagenes/product.jpg',
        content: `$2000`
      },
      {
        titulo: 'Card Title',
        subtitulo: 'Card Subtitle',
        img: 'assets/imagenes/product.jpg',
        content: `$2000`
      },
    ]

  }

}
