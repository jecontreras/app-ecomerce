import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { FactoryModelService } from '../services/factory.model.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(
    private _model: FactoryModelService
  ) {
  }
  get(query: any){
    return this._model.query('archivo', query);
  }
  saved (query: any){
    let postData = new FormData();
    for(let row of query.img){
      row.img = postData.append('file', row);
    }
    console.log(query);
    return this._model.create('galeria/file', query);
  }
}