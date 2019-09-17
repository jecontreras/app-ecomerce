// app.ts

import * as _action from './app.actions';
import * as _ from 'lodash';

let APP = {
    nameapp:{},
    articulos:[],
    mensajes: [],
    notificaciones:[],
    comentarios:[],
    compras:[]
};
export function appReducer(state: object = APP, action: _action.actions) {
  if(JSON.parse(localStorage.getItem('APP'))) APP = JSON.parse(localStorage.getItem('APP'));
  function local_Storage(APP){
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(APP));
  }
  switch (action.type) {
    case _action.NAMEAPP:{
      APP.nameapp = action.payload;
      local_Storage(APP);
    }
    break;
    case _action.ARTICULOS:{
      switch (action.opt){
        case 'get': {
          APP.articulos = _.map(action.payload,(row)=> row);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'post': {
          APP.articulos.push(action.payload);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'put': {
          let idx = _.findIndex(APP.articulos, ['id'], action.payload['id']);
          if(idx >-1){
            APP.articulos[idx]= action.payload;
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        case 'delete': {
          let idx = _.findIndex(APP.articulos, ['id'], action.payload['id']);
          if(idx >-1){
            APP.articulos.splice(idx, 1);
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        default:
        return action.payload;
        break;
      }
    }
    break;
    case _action.MENSAJES:{
      switch (action.opt){
        case 'get': {
          APP.mensajes = _.map(action.payload,(row)=> row);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'post': {
          APP.mensajes.push(action.payload);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'put': {
          let idx = _.findIndex(APP.mensajes, ['id'], action.payload['id']);
          if(idx >-1){
            APP.mensajes[idx]= action.payload;
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        case 'delete': {
          let idx = _.findIndex(APP.mensajes, ['id'], action.payload['id']);
          if(idx >-1){
            APP.mensajes.splice(idx, 1);
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        default:
        return action.payload;
        break;
      }
    }
    break;
    case _action.NOTIFICACIONES:{
      switch (action.opt){
        case 'get': {
          APP.notificaciones = _.map(action.payload,(row)=> row);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'post': {
          APP.notificaciones.push(action.payload);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'put': {
          let idx = _.findIndex(APP.notificaciones, ['id'], action.payload['id']);
          if(idx >-1){
            APP.notificaciones[idx]= action.payload;
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        case 'delete': {
          let idx = _.findIndex(APP.notificaciones, ['id'], action.payload['id']);
          if(idx >-1){
            APP.notificaciones.splice(idx, 1);
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        default:
        return action.payload;
        break;
      }
    }
    break;
    case _action.COMENTARIOS: {
      switch (action.opt){
        case 'get': {
          APP.comentarios = _.map(action.payload,(row)=> row);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'post': {
          APP.comentarios.push(action.payload);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'put': {
          let idx = _.findIndex(APP.comentarios, ['id'], action.payload['id']);
          if(idx >-1){
            APP.comentarios[idx]= action.payload;
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        case 'delete': {
          let idx = _.findIndex(APP.comentarios, ['id'], action.payload['id']);
          if(idx >-1){
            APP.comentarios.splice(idx, 1);
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        default:
        return action.payload;
        break;
      }
    }
    break;
    case _action.COMPRAS:{
      switch (action.opt){
        case 'get': {
          APP.compras = _.map(action.payload,(row)=> row);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'post': {
          APP.compras.push(action.payload);
          local_Storage(APP);
          return action.payload;
        }
        break;
        case 'put': {
          let idx = _.findIndex(APP.compras, ['id'], action.payload['id']);
          if(idx >-1){
            APP.compras[idx]= action.payload;
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        case 'delete': {
          let idx = _.findIndex(APP.compras, ['id'], action.payload['id']);
          if(idx >-1){
            APP.compras.splice(idx, 1);
            local_Storage(APP);
            return action.payload;
          }
          return action.payload;
        }
        break;
        default:
        return action.payload;
        break;
      }
    }
    break;
    default: return state;
  }
}
