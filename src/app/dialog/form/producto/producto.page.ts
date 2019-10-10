import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { ArticulosAction } from 'src/app/redux/app.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  evento: any = {};
  myForm_product: FormGroup;

  public loginForm: FormGroup;
  public url: any = ``;
  public clone: any = {};
  public m: any = '';
  public data:any = {};

  @ViewChildren('slideWithNav') slideWithNav: IonSlides;
  sliderOne: any;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(
    private modalCtrl: ModalController,
    private navparams: NavParams,
    private _store: Store<ARTICULOS>,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) { 
    this.myForm_product = this.createMyForm();
    this.evento = this.navparams.get('obj');
    if(this.evento){
      this.url = this.evento.foto;
      this.myForm_product.patchValue(this.evento);
    }

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
    this.data = {
      list_informacion: [{}],
      list_envios: [{}],
      list_galeria: Array()
    };
  }

  ngOnInit() {
    
    
  }
  view_image(ev){
    let 
      file = ev.target.files[0],
      imageType = /image.*/
    ;
    if (!file.type.match(imageType)) return;

    var reader = new FileReader();
    reader.onload = this.fileOnload;
    this.m = reader.readAsDataURL(file);
  }
  fileOnload(e){
    var result=e.target.result;
  }

  createMyForm(){
    return this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      foto: ['https://publihazclick.s3.amazonaws.com/venty/41dd1b07-3589-4e83-a72c-ed42e624622c.jpg', Validators.required],
      "codigo": [this.codigo(), Validators.required],
      "slug": ['', Validators.required],
      "tipo": ['producto', Validators.required],
      "costovarios": [false, Validators.required],
      "tipoproduct": ['producto', Validators.required],
      "cantidad": [0, Validators.required],
      "peso": [0, Validators.required],
      "estado": ['nuevo', Validators.required],
      "opcion": ['activo', Validators.required],
      "costopromosion": [0, Validators.required],
      "costoventa": [0, Validators.required],
      "alto": [0, Validators.required],
      "largo": [0, Validators.required],
      "ancho": [0, Validators.required],
      "id": [this.codigo(), Validators.required]
    });
  }
  codigo(){
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase(); 
  }
  submit(){
    let data:any = this.myForm_product.value;
    data.comentario = [];
    data.informacion_articulo = [];
    let accion:any = new ArticulosAction(data, 'post');
    this._store.dispatch(accion);
    this.myForm_product = this.createMyForm();
  }

  async editar(){
    let data = this.myForm_product.value;
    if(!this.evento.id) return false;
    data.id = this.evento.id;
    let accion = new ArticulosAction(data, 'put');
    this._store.dispatch(accion);
    const toast = await this.toastController.create({
      message: 'Actualizado.',
      duration: 2000
    });

    toast.present();
  }
  cerrarModal() {
    this.modalCtrl.dismiss();
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
