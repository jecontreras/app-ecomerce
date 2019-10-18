import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MENSAJES } from 'src/app/redux/interfax/mensajes';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/service-component/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public list_mensajes: Array<Object> = [];
  
  public data_user:any;
  public store:any;
  public disable_list: boolean = true;
  public ev:any;

  constructor(
    private _store: Store<MENSAJES>,
    private router: Router,
    private route: ActivatedRoute,
    private _chat: ChatService
  ) {
    this._store.select("name")
      .subscribe((store: any) => {
        console.log(store);
        
        this.data_user = store.user;
        if(Object.keys(this.data_user).length ===0){
          this.router.navigate(['login']);
        }
        this.store = store;
        this.init();
      });
  }
  ngOnInit() {
  }
  init(){
    this.list_mensajes = _.unionBy(this.list_mensajes || [], this.store.mensajes, 'id');
    if (this.list_mensajes.length === 0) {
      this.get_chat();
    }
  }
  doRefresh(ev){
    this.ev = ev;
    this.disable_list = false;
    this.get_chat();
  }

  get_chat(){
    let query:any = {
      where:{
        or:[
          {emisor: this.data_user.id},
          {reseptor: this.data_user.id}
        ]
      },
      sort: 'updatedAt DESC'
    }
    console.log(query)
    return this._chat.get(query)
    .subscribe((rta:any)=>{
      console.log(rta);
      this.list_mensajes = _.unionBy(this.list_mensajes || [], rta.data, 'id');
        if(this.ev){
          this.disable_list = true;
          if(this.ev.target){
            this.ev.target.complete();
          }
        }
    });
  }

}
