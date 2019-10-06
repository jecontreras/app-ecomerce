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
      title: 'Notificaciones',
      url: '/notificacion',
      icon: 'notifications-outline'
    },
    {
      title: 'Mensajes',
      url: '/chat',
      icon: 'mail-unread'
    }
  ];
  public appTienda = [
    {
      title: 'Productos',
      url: '/product',
      icon: 'filing'
    },
    {
      title: 'Anuncios',
      url: '/chat',
      icon: 'megaphone'
    },
    {
      title: 'Subastas',
      url: '/subastas',
      icon: 'hammer'
    },
    {
      title: 'Negocios',
      url: '/chat',
      icon: 'contacts'
    }
  ]

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
