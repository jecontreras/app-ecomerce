import { Injectable } from '@angular/core';
import { Config } from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { handleError } from './errores';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

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
  constructor(
    private _http: HttpClient,
    private router: Router,
  ) {
      this.url = GLOBAL.url;
      this.global = GLOBAL;
      this.handleError = handleError;
  }
  create(modelo: string, query: any): Observable<Config> {
    return this._http.post<Config>(this.url + modelo, query).pipe(
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
  getFechaServidor() {
    return this._http.get(this.url + 'user/fecha').pipe(
      // retry(3),
      catchError(this.handleError)
    );
  }
}