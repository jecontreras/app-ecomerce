import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ProductosComponent } from './component/product/productos.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt
import { StoreModule } from '@ngrx/store';
import { appReducer } from './redux/app';
import { ProductoPageModule } from './dialog/form/producto/producto.module';
import { CategoriasComponent } from './component/categorias/categorias.component';
import { ProductviewComponent } from './component/productview/productview.component';
import { ChequiarComponent } from './component/chequiar/chequiar.component';
import { ChatComponent } from './component/chat/chat.component';
import { ChatViewComponent } from './component/chat-view/chat-view.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    CategoriasComponent,
    ProductviewComponent,
    ChatViewComponent,
    ChequiarComponent,
    ChatComponent
  ],
  entryComponents: [
  ],
  exports:[
  ],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({ name: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    BrowserModule,
    RouterModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ProductoPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
