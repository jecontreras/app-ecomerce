import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { MensajesAction } from 'src/app/redux/app.actions';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {
  public list_mensajes: any = [{ emisor: {} }];
  public myForm_chat: FormGroup;
  public data:any = {};

  constructor(
    private _store: Store<MENSAJES>,
    public formBuilder: FormBuilder,
  ) {

    this.myForm_chat = this.create_form();
    
    this._store.select("name")
    .subscribe((store:any)=>{
        console.log(store);
        // this.list_mensajes = _.unionBy(this.list_mensajes || [], store.mensajes, 'emisor');
        // this.list_mensajes = _.orderBy(this.list_mensajes, ['creado'], ['asc']);
    });
    if (this.list_mensajes.length === 1) {
      this.list_mensajes = [
        {
          emisor: {
            id: 2,
            username: "jose",
            foto: "assets/imagenes/dilisap1.png"
          },
          reseptor: {
            id: 1,
            username: "andres",
            foto: "assets/imagenes/dilisap1.png"
          },
          id: 1,
          mensaje: "hola andres"
        },
        {
          emisor: {
            id: 2,
            username: "jose",
            foto: "assets/imagenes/dilisap1.png"
          },
          reseptor: {
            id: 1,
            username: "andres",
            foto: "assets/imagenes/dilisap1.png"
          },
          id: 1,
          mensaje: "hola jose"
        },
        {
          emisor: {
            id: 2,
            username: "jose",
            foto: "assets/imagenes/dilisap1.png"
          },
          reseptor: {
            id: 1,
            username: "andres",
            foto: "assets/imagenes/dilisap1.png"
          },
          id: 1,
          mensaje: "como estas"
        }
      ];
    }
  }

  ngOnInit() { }
  create_form() {
    return this.formBuilder.group({
      mensaje: ['', Validators.required],
      emisor: [this.codigo(), Validators.required],
      reseptor: [2, Validators.required],
      creado: [new Date(), Validators.required]
    });
  }
  submit_mensaje(){
    console.log(this.myForm_chat.value);
    let data = this.myForm_chat.value;
    let accion = new MensajesAction(data, 'post');
    this._store.dispatch(accion);
    this.myForm_chat = this.create_form();

  }
  codigo(){
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase(); 
  }
}
