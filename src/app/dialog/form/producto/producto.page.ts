import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ARTICULOS } from 'src/app/redux/interfax/articulos';
import { ArticulosAction } from 'src/app/redux/app.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  
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
  evento: any = {};
  myForm_product: FormGroup;
  public myForm: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private navparams: NavParams,
    private _store: Store<ARTICULOS>,
    public formBuilder: FormBuilder
  ) { 
    this.evento = this.navparams.get('obj');
    console.log(this.evento);
    if(this.evento){
      this.data = this.evento;
    }
    this.myForm_product = this.createMyForm();
  }

  ngOnInit() {
  }
  createMyForm(){
    return this.formBuilder.group({
      titulo: ['', Validators.required],
      // descripcion: ['', Validators.required],
      foto: ['https://publihazclick.s3.amazonaws.com/venty/41dd1b07-3589-4e83-a72c-ed42e624622c.jpg', Validators.required],
      "codigo": ['', Validators.required],
      // "slug": ['', Validators.required],
      // "tipo": ['producto', Validators.required],
      // "costovarios": [false, Validators.required],
      // "tipoproduct": ['producto', Validators.required],
      "cantidad": [0, Validators.required],
      // "peso": [0, Validators.required],
      // "estado": ['nuevo', Validators.required],
      // "opcion": ['activo', Validators.required],
      "costopromosion": [0, Validators.required],
      "costoventa": [0, Validators.required],
      // "alto": [0, Validators.required],
      // "largo": [0, Validators.required],
      // "ancho": [0, Validators.required]
    });
  }
  submit(){
    // console.log(this.data);
    this.data.titulo          = this.data.titulo;
    this.data.descripcion     = this.data.descripcion;
    this.data.id = 123;
    let accion = new ArticulosAction(this.data, 'post');
    this._store.dispatch(accion);
    this.data.titulo = '';
    this.data.descripcion = '';
    this.data.id+= this.data.id;
    // this.http.post('http://localhost:1337/articulo',this.data)
    // .subscribe(
    //   (res: any)=>{
    //     console.log(res);
    //     let accion = new ArticulosAction(res, 'post');
    //     this._store.dispatch(accion);
    //   }
    // );

  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
