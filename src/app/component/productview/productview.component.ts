import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonSlides } from '@ionic/angular';
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

  public data: any = {};
  public list_productos: any = [];

  @ViewChildren('slideWithNav') slideWithNav: IonSlides;
  @ViewChildren('slideWithNav2') slideWithNav2: IonSlides;
  @ViewChildren('slideWithNav3') slideWithNav3: IonSlides;
  @ViewChildren('slideWithNav4') slideWithNav4: IonSlides;
  @ViewChildren('slideWithNav5') slideWithNav5: IonSlides;

  sliderOne: any;
  sliderTho: any;
  sliderThree: any;
  sliderFoor: any;
  sliderFive: any;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTho = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };
  slideOptsFoor = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };
  slideOptsFive = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<ARTICULOS>,
    public toastController: ToastController
  ) {
    this._store.select("name")
      .subscribe((store: any) => {
        console.log(store);
        this.list_productos = store.articulos;
      });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.data = this.list_productos.find(row => row.id == params['id']);
        this.data.cantida_adquiridad = String(1);
        if (!this.data.informacion_articulo) this.data.informacion_articulo = [{ key: "none", value: "none" }];
        if (!this.data.comentario) this.data.comentario = [{ key: "none", value: "none" }];
        if (!this.data.envios_devoluciones) this.data.envios_devoluciones = [{ key: "none", value: "none" }];
        if (!this.data.list_comentario_vendedor) this.data.list_comentario_vendedor = [{ username: "pos_r", titulo: "Excelente", comentario: "genial vendedor" }];
        if (!this.data.user) this.data.user = {};
      }
    });
    this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: [
          {
            id: 1,
            image: './assets/imagenes/dilisap1.png'
          },
          {
            id: 2,
            image: './assets/imagenes/dilisap1.png'
          },
          {
            id: 3,
            image: './assets/imagenes/dilisap1.png'
          },
          {
            id: 4,
            image: './assets/imagenes/dilisap1.png'
          },
          {
            id: 5,
            image: './assets/imagenes/dilisap1.png'
          }
        ]
      };
  }
  submit_cart(opt: any) {
    let data = this.data;
    if (!data.cantida_adquiridad) return this.presentToast('Erro por favor agregar una cantidad');;
    let accion = new CartAction(data, 'post');
    this._store.dispatch(accion);
    if (opt === 'comprar') this.router.navigate(['chech']);
    else this.presentToast('Producto Agregado al Cart');
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'iontoast'
    });
    toast.present();
  }
  fn_favorito() {

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
