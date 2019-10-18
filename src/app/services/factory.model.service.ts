import { Injectable } from '@angular/core';
import { Config } from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { handleError } from './errores';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class FactoryModelService {
  public url: string;
  private handleError: any;
  public user: any;
  public niveles: any;
  public global: any;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  public app: Object={};
  public sock:any;

  constructor(
    private _http: HttpClient,
    private router: Router,
  ) {
      this.url = GLOBAL.url;
      this.global = GLOBAL;
      this.handleError = handleError;
  }

  conectionSocket(){
    io.sails.autoConnect = false;
    console.log(GLOBAL.url);
    this.sock = io.sails.connect('http://localhost:1337');
    this.scoket_global();
  }
  
  create(modelo: string, query: any): Observable<Config> {
    return this._http.post<Config>(this.url + modelo, query).pipe(
      // map((data:any)=> data.valor),
      // retry(3),
      catchError(this.handleError)
    );
  }
  
  update(modelo: string, referencia: string, query: any): Observable<Config> {
    return this._http.put<Config>(this.url + modelo + '/' + referencia, query).pipe(
      // retry(3),
      catchError(this.handleError)
    );
  }
  
  delete(modelo: string, referencia: string, query: any) {
    return this._http.delete(this.url + modelo + '/' + referencia, query).pipe(
      // retry(3),
      catchError(this.handleError)
    );
  }

  get(modelo: string, query: any) {
    if (query) {
      const options = {
        params: query
      };
      return this._http.get(this.url + modelo, options).pipe(
        // retry(3),
        catchError(this.handleError)
      );
    } else {
      return this._http.get(this.url + modelo).pipe(
        // retry(3),
        catchError(this.handleError)
      );
    }
  }

  query(modelo: string, query: any) {
    if (!query) {
      query = {};
    }
    if (!query.where) {
      query = {
        where: query
      }
        ;
    }
    const ruta = _.split(modelo, '/', 2);
    if (ruta[1]) {
      modelo = modelo;
    } else {
      modelo = modelo + '/query';
    }

    // query.app = this.adsSecuryty();
    return this._http.post(this.url + modelo, query).pipe(
      catchError(this.handleError)
    );
  }
  
  scoket_global(){
    this.sock.on('message', function (json) {
        console.log("hep");
    });
  }

}