import { Component, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { IonSlides } from '@ionic/angular';
import { CategoriaService } from 'src/app/service-component/categoria.service';
import { AppService } from 'src/app/service-component/app.service';
import { NameappAction } from 'src/app/redux/app.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listado : any = [];
  public listhome: any = [];
  public searchtxt: any = '';

  @ViewChildren('slideWithNav') slideWithNav: IonSlides;

  public sliderOne: any = {
    isBeginningSlide: true,
    isEndSlide: false,
    slidesItems: Array()
  };
  //Configuration for each Slider
  public slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };

  public slideOptsTho = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: false
  };

  public data_app:any = {}


  constructor( 
      private _categoria: CategoriaService,
      private _app: AppService,
      private _store: Store<ARTICULOS>,
  ) {
    this.init_app();
    this.get_categoria();
  }
  init_app(){
    this.get_app();
    this._store.select("name")
    .subscribe((store:any)=>{
      console.log(store);
      // if( Object.keys(store.nameapp).length > 0 ) this.relleno_list(store.nameapp);
      if( Object.keys(store.articulos).length > 0 ) this.listado;
    });
  }
  
  relleno_list(nameapp = {}){
    this.listhome = nameapp;
  }

  get_app(){
    return this._app.get_detalles({})
    .subscribe((res:any)=>{
      res = res.data;
      console.log(res);
      if( Object.keys(res).length > 0 ) {
        this.data_app = res;
        let accion:any = new NameappAction(res, 'post');
        this._store.dispatch(accion);
      }else {
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
    });
  }



  get_categoria(){
    return this._categoria.get({
      where:{
        estado: 'activo',
        categoriaDe: 'producto'
      },
      limit: 10
    })
    .subscribe((rta:any)=>{
      rta = rta.data;
      if(Object.keys(rta).length > 0) this.ajuste_categoria(rta);
      else this.ajuste_categoria();
    });
  }
  ajuste_categoria(obj:any =false){
    this.sliderOne.slidesItems = obj ? obj :[
        {
          id: 1,
          titulo: 'Plotters'
        },
        {
          id: 2,
          titulo: 'Calandras'
        },
        {
          id: 3,
          titulo: 'Planchas'
        },
      ];
  }
  search(){
    console.log("hola", this.listhome, this.searchtxt);
    
    this.listhome[0].listado = this.listhome[0].listado.filter(row=>row.titulo >= this.searchtxt)
    console.log(this.listado);
  }

   // TODO FUNCIONES DEL SLIDER
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });;
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      if(object)object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      if(object)object.isEndSlide = istrue;
    });
  }

}
