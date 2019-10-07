import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { MensajesAction } from 'src/app/redux/app.actions';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';
import { ChatService } from 'src/app/service-component/chat.service';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {
  public list_mensajes: any = [{ emisor: {} }];
  public myForm_chat: FormGroup;
  public data: any = {};

  constructor(
    private _store: Store<MENSAJES>,
    private _chat: ChatService,
    public formBuilder: FormBuilder,
  ) {

    this.myForm_chat = this.create_form();
    this._store.select("name")
      .subscribe((store: any) => {
        console.log(store);
        this.list_mensajes = _.unionBy(this.list_mensajes || [], store.mensajes, 'emisor');
        this.list_mensajes = _.orderBy(this.list_mensajes, ['creado'], ['asc']);
      });
    this.get_init();
  }
  ngOnInit() { }

  get_init() {
    this.get_chat();
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
  get_chat() {
    return this._chat.get({
      where: {

      }
    }).subscribe((rta: any) => {
      console.log(rta);
      this.list_mensajes = rta.data;
    });
  }
  create_form() {
    return this.formBuilder.group({
      mensaje: ['', Validators.required],
      emisor: ["5d24414039c3ae3544290008", Validators.required],
      reseptor: ["5d63cb01b2e0cd16e81c39c0", Validators.required],
      creado: [new Date(), Validators.required]
    });
  }
  submit_mensaje() {
    console.log(this.myForm_chat.value);
    let data = this.myForm_chat.value;
    return this._chat.saved(data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 200) {
          let accion = new MensajesAction(res.mensaje, 'post');
          this._store.dispatch(accion);
          this.myForm_chat = this.create_form();
        }
      });

  }
  codigo() {
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }
}
