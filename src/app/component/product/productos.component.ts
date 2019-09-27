import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { ArticulosAction } from 'src/app/redux/app.actions';
import { ModalController } from '@ionic/angular';
import { ProductoPage } from '../../dialog/form/producto/producto.page';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  data:any = {
    titulo: '',
    descripcion: '',
    foto: "https://publihazclick.s3.amazonaws.com/venty/41dd1b07-3589-4e83-a72c-ed42e624622c.jpg",
    "infodrive1": null,
    "infodrive2": null,
    "codigo": "QKSWE",
    "slug": "as",
    "tipo": "producto",
    "megusta": 1,
    "costovarios": false,
    "tipoproduct": "producto",
    "nomegusta": 0,
    "vistos": 0,
    "compartidos": 0,
    "cantidad": 1,
    "stock": 1,
    "peso": 1,
    "estado": "nuevo",
    "opcion": "activo",
    "costocompra": 0,
    "costopromosion": 0,
    "porcentajedes": 0,
    "costoventa": 12312,
    "fechavencimiento": "",
    "alto": 1,
    "largo": 1,
    "ancho": 1,
  };
  list_product: any = [];
  constructor(
    private http: HttpClient,
    private _store: Store<ARTICULOS>,
    private modalCtrl: ModalController
  ) { 

    this._store.select("name")
    .subscribe((store:any)=>{
      console.log(store);
      this.list_product = store.articulos; 
    });
  }

  ngOnInit() {
  }
  open_form(obj) {
    console.log(this.modalCtrl);
    this.modalCtrl.create({
      component: ProductoPage,
      componentProps: {
        obj: obj
      }
    }).then(modal=>modal.present());
  }

  submit(){
    // console.log(this.data);
    this.data.titulo          = this.data.titulo;
    this.data.descripcion     = this.data.descripcion;
    this.data.id = 123;
    let accion = new ArticulosAction(this.data, 'post');
    this._store.dispatch(accion);
    // this.http.post('http://localhost:1337/articulo',this.data)
    // .subscribe(
    //   (res: any)=>{
    //     console.log(res);
    //     let accion = new ArticulosAction(res, 'post');
    //     this._store.dispatch(accion);
    //   }
    // );

  }
  update(){
    // console.log(this.data);
    this.data.titulo          = this.data.titulo;
    this.data.descripcion     = this.data.descripcion;
    this.data.id = 123;
    let accion = new ArticulosAction(this.data, 'post');
    this._store.dispatch(accion);
    // this.http.post('http://localhost:1337/articulo',this.data)
    // .subscribe(
    //   (res: any)=>{
    //     console.log(res);
    //     let accion = new ArticulosAction(res, 'post');
    //     this._store.dispatch(accion);
    //   }
    // );

  }

}
