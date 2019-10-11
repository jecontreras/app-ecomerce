import { Component, ViewChildren } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado : any = [];
  listhome: any = [];
  searchtxt: any = '';

  @ViewChildren('slideWithNav') slideWithNav: IonSlides;

  sliderOne: any;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: true
  };

  constructor( 
      private http: HttpClient,
      private _store: Store<ARTICULOS>,
  ) {
    this._store.select("name")
    .subscribe((store:any)=>{
      console.log(store);
      this.relleno_list(store);
    });

    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
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
        {
          id: 4,
          titulo: 'Planchas'
        },
        {
          id: 5,
          titulo: 'Planchas'
        },
        {
          id: 6,
          titulo: 'Planchas'
        },
      ]
    };

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
