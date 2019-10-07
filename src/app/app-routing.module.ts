import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './component/product/productos.component';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { ProductviewComponent } from './component/productview/productview.component';
import { ChequiarComponent } from './component/chequiar/chequiar.component';
import { ChatComponent } from './component/chat/chat.component';
import { ChatViewComponent } from './component/chat-view/chat-view.component';
import { SubastasComponent } from './component/subastas/subastas.component';
import { NotificacionesComponent } from './component/notificaciones/notificaciones.component';
import { RegistroComponent } from './logeo/registro/registro.component';
import { LoginComponent } from './logeo/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./component/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'product',
    component: ProductosComponent
    // loadChildren: () => import('./component/product/productos').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'categoria',
    component: CategoriasComponent
  },
  {
    path: 'categoria/:id',
    component: CategoriasComponent
  },
  {
    path: 'productoview',
    component: ProductviewComponent
  },
  {
    path: 'productoview/:id',
    component: ProductviewComponent
  },
  {
    path: 'chech',
    component: ChequiarComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'chat_view/:id',
    component: ChatViewComponent
  },
  {
    path: 'notificacion',
    component: NotificacionesComponent
  },
  {
    path: 'subastas',
    component: SubastasComponent
  },
  { path: 'producto', loadChildren: './dialog/form/producto/producto.module#ProductoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
