import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado : any = [];
  listhome: any = [];
  searchtxt: any = '';
  list_categoria: any = [
    {
      titulo: 'Plotters'
    },
    {
      titulo: 'Calandras'
    },
    {
      titulo: 'Planchas'
    }
  ];
  constructor( 
      private http: HttpClient,
      private _store: Store<ARTICULOS>,
  ) {
    this._store.select("name")
    .subscribe((store:any)=>{
      console.log(store);
      this.relleno_list(store);
    });

  }
  relleno_list(store){
    this.listado = store.articulos;
    this.listhome = [
      {
        titulo: 'Últimos productos',
        listado: this.listado,
      },
      {
        titulo: 'Ofertas de equipos',
        listado: this.listado,
      },
    ]
  }
  search(){
    console.log("hola", this.listhome, this.searchtxt);
    
    this.listhome[0].listado = this.listhome[0].listado.filter(row=>row.titulo >= this.searchtxt)
    console.log(this.listado);
  }
}
