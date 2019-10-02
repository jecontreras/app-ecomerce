import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import * as _ from 'lodash';
import { CartAction } from 'src/app/redux/app.actions';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.scss'],
})
export class ProductviewComponent implements OnInit {
  public data:any = {}; 
  public list_productos:any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<ARTICULOS>,
    public toastController: ToastController
  ) {
    this._store.select("name")
    .subscribe((store:any)=>{
        console.log(store);
        this.list_productos = store.articulos;
    });

   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
        this.data = this.list_productos.find(row=>row.id == params['id']);
      }
    });
  }
  submit_cart(opt:any){
    let data = this.data;
    if(!data.cantida_adquiridad) return this.presentToast('Erro por favor agregar una cantidad');;
    let accion = new CartAction(data, 'post');
    this._store.dispatch(accion);
    if(opt === 'comprar')  this.router.navigate(['chech']);
    else this.presentToast('Producto Agregado al Cart');
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass:'iontoast'
    });
    toast.present();
  }
  fn_favorito(){

  }

}
