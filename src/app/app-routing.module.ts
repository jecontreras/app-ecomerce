import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './component/product/productos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
  { path: 'producto',
    loadChildren: () => import('./dialog/form/producto/producto.module').then(m => m.ProductoPageModule) },
  { path: 'articulo-model', loadChildren: './dialog/form/articulo-model/articulo-model.module#ArticuloModelPageModule' }

  // { path: 'producto', loadChildren: './dialog/form/producto/producto.module#ProductoPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
