import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado : any = [];
  listhome: any = [];
  searchtxt: any = '';
  constructor( private http: HttpClient ) {
    this.http.get('http://localhost:1337/articulo',{})
    .subscribe(
      (res: any)=>{
        console.log(res);
        this.listado = res;
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
    );
    // this.listado = [
    //   {
    //     titulo: 'Card Title',
    //     subtitulo: 'Card Subtitle',
    //     img: '../../assets/imagenes/product.jpg',
    //     content: `$2000`
    //   },
    //   {
    //     titulo: 'Card Title',
    //     subtitulo: 'Card Subtitle',
    //     img: '../../assets/imagenes/product.jpg',
    //     content: `$2000`
    //   },
    // ];

  }
  search(){
    this.listhome[0].listado = this.listhome[0].listado.filter(row=>row.titulo >= this.searchtxt)
    console.log(this.listado);
  }
}
