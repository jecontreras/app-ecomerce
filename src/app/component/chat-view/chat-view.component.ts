import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { MensajesAction } from 'src/app/redux/app.actions';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';
import { ChatService } from 'src/app/service-component/chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit {
  public list_mensajes: any = [{ emisor: {}, reseptor:{} }];
  public myForm_chat: FormGroup;
  public data: any = {};
  public data_user: any = {};
  public id: any;
  public disable_list:boolean = true;
  public ev:any;

  constructor(
    private _store: Store<MENSAJES>,
    private _chat: ChatService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this._store.select("name")
      .subscribe((store: any) => {
        console.log(store);
        this.data_user = store.user;
        if (Object.keys(this.data_user).length === 0) {
          this.router.navigate(['login']);
        }

        // this.list_mensajes = _.unionBy(this.list_mensajes || [], store.mensajes, 'emisor');
        // this.list_mensajes = _.orderBy(this.list_mensajes, ['creado'], ['asc']);
    });
    this.route.params.subscribe(params => {
      if (params['id'] != null) {
        this.id = params['id'];
      }
    });
    this.get_init();
    this.myForm_chat = this.create_form();
  }
  ngOnInit() {

  }

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
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_chat();
  }
  get_chat() {
    return this._chat.get_detallado({
      where: {
        // reseptor: this.id,
        // emisor: this.data_user.id
      }
    }).subscribe((rta: any) => {
      console.log(rta, this.data_user)
      if(this.ev){
        this.disable_list = true;
        if(this.ev.target){
          this.ev.target.complete();
        }
      }
      this.list_mensajes = rta.data;
      
    });
  }
  create_form() {
    console.log(this.id)
    return this.formBuilder.group({
      mensaje: ['', Validators.required],
      emisor: [this.data_user.id, Validators.required],
      reseptor: [this.id, Validators.required],
      creado: [new Date(), Validators.required]
    });
  }
  submit_mensaje() {
    // console.log(this.myForm_chat.value);
    let data = this.myForm_chat.value;
        data.reseptor = this.id;
        data.emisor = this.data_user.id;
    console.log(data);
    return this._chat.saved(data)
      .subscribe((res: any) => {
        console.log(res);
        // if (res.status === 200) {
        //   let accion = new MensajesAction(res.mensaje, 'post');
        //   this._store.dispatch(accion);
          this.myForm_chat = this.create_form();
        // }
      });

  }
  codigo() {
    return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();
  }
}
