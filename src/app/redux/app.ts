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
export function appReducer(state: any = APP, action: _action.actions) {
  if(JSON.parse(localStorage.getItem('APP'))) state = JSON.parse(localStorage.getItem('APP'));
  else {
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(state));
  }
  // console.log(state);
  function local_Storage(APP){
    localStorage.removeItem('APP');
    localStorage.setItem('APP', JSON.stringify(APP));
    state = JSON.parse(localStorage.getItem('APP'));
    return state
  }
  switch (action.type) {
    case _action.NAMEAPP:{
      state.nameapp = action.payload;
      local_Storage(state);
    }
    break;
    case _action.ARTICULOS:{
      switch (action.opt){
        case 'post': {
          state.articulos.push(action.payload);
          return local_Storage(state);
        }
        break;
        case 'put': {
          let idx = _.findIndex(state.articulos, ['id'], action.payload['id']);
          if(idx >-1){
            state.articulos[idx]= action.payload;
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        case 'delete': {
          let idx = _.findIndex(state.articulos, ['id'], action.payload['id']);
          if(idx >-1){
            state.articulos.splice(idx, 1);
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.MENSAJES:{
      switch (action.opt){
        case 'post': {
          state.mensajes.push(action.payload);
          return local_Storage(state);
        }
        break;
        case 'put': {
          let idx = _.findIndex(state.mensajes, ['id'], action.payload['id']);
          if(idx >-1){
            state.mensajes[idx]= action.payload;
            
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        case 'delete': {
          let idx = _.findIndex(state.mensajes, ['id'], action.payload['id']);
          if(idx >-1){
            state.mensajes.splice(idx, 1);
            
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.NOTIFICACIONES:{
      switch (action.opt){
        case 'post': {
          state.notificaciones.push(action.payload);
          
          return local_Storage(state);
        }
        break;
        case 'put': {
          let idx = _.findIndex(state.notificaciones, ['id'], action.payload['id']);
          if(idx >-1){
            state.notificaciones[idx]= action.payload;
            
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        case 'delete': {
          let idx = _.findIndex(state.notificaciones, ['id'], action.payload['id']);
          if(idx >-1){
            state.notificaciones.splice(idx, 1);
            
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.COMENTARIOS: {
      switch (action.opt){
        case 'post': {
          state.comentarios.push(action.payload);
          
          return local_Storage(state);
        }
        break;
        case 'put': {
          let idx = _.findIndex(state.comentarios, ['id'], action.payload['id']);
          if(idx >-1){
            state.comentarios[idx]= action.payload;
            
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        case 'delete': {
          let idx = _.findIndex(state.comentarios, ['id'], action.payload['id']);
          if(idx >-1){
            state.comentarios.splice(idx, 1);
            
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    case _action.COMPRAS:{
      switch (action.opt){
        case 'post': {
          state.compras.push(action.payload);
          
          return local_Storage(state);
        }
        break;
        case 'put': {
          let idx = _.findIndex(state.compras, ['id'], action.payload['id']);
          if(idx >-1){
            state.compras[idx]= action.payload;
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        case 'delete': {
          let idx = _.findIndex(state.compras, ['id'], action.payload['id']);
          if(idx >-1){
            state.compras.splice(idx, 1);
            return local_Storage(state);
          }
          return local_Storage(state);
        }
        break;
        default:
        return local_Storage(state);
        break;
      }
    }
    break;
    default: return state;
  }
}
