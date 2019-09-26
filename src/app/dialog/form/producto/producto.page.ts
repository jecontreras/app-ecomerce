import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  data: any = {};
  constructor(
    private modalCtrl: ModalController,
    private navparams: NavParams
  ) { 
    this.data = this.navparams.get('obj');
    console.log(this.data);

  }

  ngOnInit() {
  }
  cerrarModal() {
    this.modalCtrl.dismiss();
  }

}
