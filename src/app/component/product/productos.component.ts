import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  data = {
    titulo: '',
    descripcion: '',
    "infodrive1": null,
    "infodrive2": null,
    "codigo": "QKSWE",
    "slug": "as",
    "tipo": "producto",
    "megusta": 1,
    "costovarios": false,
    "tipoproduct": "producto",
    "nomegusta": 0,
    "vistos": 0,
    "compartidos": 0,
    "cantidad": 1,
    "stock": 1,
    "peso": 1,
    "estado": "nuevo",
    "opcion": "activo",
    "costocompra": 0,
    "costopromosion": 0,
    "porcentajedes": 0,
    "costoventa": 12312,
    "fechavencimiento": "",
    "alto": 1,
    "largo": 1,
    "ancho": 1,
  };
  constructor(private http: HttpClient) { 

  }

  ngOnInit() {
  }
  submit(){
    // console.log(this.data);
    this.data.titulo          = this.data.titulo;
    this.data.descripcion     = this.data.descripcion;
    this.http.post('http://localhost:1337/articulo',this.data)
    .subscribe(
      (res: any)=>{
        // console.log(res);
      }
    );

  }

}
