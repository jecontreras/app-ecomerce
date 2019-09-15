import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Publicar Producto',
      url: '/product',
      icon: 'clipboard'
    },
    {
      title: 'Chat',
      url: '/chat',
      icon: 'mail-unread'
    },
    {
      title: 'Notificaciones',
      url: '/home',
      icon: 'notifications-outline'
    },
    {
      title: 'Mensajes',
      url: '/home',
      icon: 'mail'
    },
    {
      title: 'Visto',
      url: '/home',
      icon: 'eye'
    },
    {
      title: 'Comprado',
      url: '/home',
      icon: 'cash'
    },
    {
      title: 'Ofertas',
      url: '/home',
      icon: 'pricetags'
    }
    // {
    //   title: 'List',
    //   url: '/list',
    //   icon: 'list'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
