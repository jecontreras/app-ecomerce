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
  constructor(
    private _store: Store<MENSAJES>,
    public formBuilder: FormBuilder,
  ) {

    this.myForm_chat = this.create_form();
    
    this._store.select("name")
    .subscribe((store:any)=>{
        console.log(store);
        this.list_mensajes = _.unionBy(this.list_mensajes || [], store.mensajes, 'id');
    });
    if (this.list_mensajes.length === 0) {
      this.list_mensajes = [
        {
          emisor: {
            username: "jose",
            foto: "assets/imagenes/dilisap1.png"
          },
          reseptor: {
            username: "andres",
            foto: "assets/imagenes/dilisap1.png"
          },
          id: 1,
          mensaje: "hola carnales"
        }
      ];
    }
  }

  ngOnInit() { }
  create_form() {
    return this.formBuilder.group({
      mensaje: ['', Validators.required],
      emisor: ['', Validators.required],
      reseptor: ['', Validators.required]
    });
  }
  submit_mensaje(){
    console.log(this.myForm_chat.value);
    let data = this.myForm_chat.value;
    data.emisor = 1;
    data.reseptor = 2;
    let accion = new MensajesAction(data, 'post');
    this._store.dispatch(accion);
    this.myForm_chat = this.create_form();

  }
}
