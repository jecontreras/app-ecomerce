import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public list_mensajes: Array<Object> = [{
    emisor: {}
  }];
  constructor(
    private _store: Store<MENSAJES>,
  ) {
    this._store.select("name")
      .subscribe((store: any) => {
        console.log(store);
        this.list_mensajes = _.unionBy(this.list_mensajes || [], store.mensajes, 'id');
        if (this.list_mensajes.length === 0) {
          this.list_mensajes = [
            {
              emisor: {
                username: "jose",
                foto: "assets/imagenes/dilisap1.png"
              },
              resepto:{
                username: "andres",
                foto: "assets/imagenes/dilisap1.png"
              },
              id: 1,
              mensaje: "hola carnales"
            }
          ];
        }
      });

  }

  ngOnInit() {


  }

}
