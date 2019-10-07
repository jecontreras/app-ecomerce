import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { FactoryModelService } from '../services/factory.model.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private _model: FactoryModelService
  ) {
    // this.cuerpo = this._model;
  }
  get(query: any){
    return this._model.query('chat', query);
  }
  saved (query: any){
    return this._model.create('chat/iniciar_chat', query);
  }
}