import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service-component/producto.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.scss'],
})
export class ListproductComponent implements OnInit {

  public list_articulo:any = [];
  public img:any = './assets/imagenes/dilisap1.png';
  public query:any = {
    where:{}
  }
  public searchtxt:any = '';
  
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
  search(){
    if(this.searchtxt.length > 1){
      this.query.where.or = [
        {
          titulo:{
            contains: this.searchtxt || ''
          }
        },
        {
          slug:{
            contains: _.kebabCase(this.searchtxt) || ''
          }
        }
      ];
    }else{
      delete this.query.where.or;
    }
    this.get_producto();
  }
  get_producto(){
    return this._Producto.get(this.query)
    .subscribe((res:any)=>{
      console.log(res);
      this.list_articulo = res;
    });
  }

}
