import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service-component/producto.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss'],
})
export class ListproductComponent implements OnInit {

  public list_articulo:any = [];
  public img:any = './assets/imagenes/dilisap1.png';
  
  constructor(
    private _Producto: ProductoService
  ) { 

    this.get_producto();

  }

  ngOnInit() {

    // this.list_articulo = [
    //   {
    //     titulo: "Prueba",
    //     foto: "./assets/imagenes/dilisap1.png"
    //   }
    // ]

  }

  get_producto(){
    return this._Producto.get({})
    .subscribe((res:any)=>{
      console.log(res);
      this.list_articulo = res;
    });
  }

}
