import { Component, OnInit } from '@angular/core';
import { Factura } from '../facturas/clases/factura';
import { Reparacion } from '../reparaciones/clases/reparacion';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  reparaciones: Reparacion[] = [];
  facturas: Factura[] = [];
  stock: any[] = [];

  now: Date;
  marcas: String[] = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'BQ'];

  constructor(private _mainService: MainService) { }

  ngOnInit() {
    this.now = new Date();
    this._mainService.getReparaciones().subscribe(res => this.reparaciones = <Reparacion[]>res);
    this._mainService.getFacturas().subscribe(res => this.facturas = <Factura[]>res);

    this.marcas.forEach(marca => this._mainService.getStocks({marca: marca}).subscribe(res => this.stock.push(res)));
    
  }

  getDays(date: any){
    let data = new Date(date)
    let delta = (this.now.getTime() - data.getTime()) / 1000 / 60 / 60 / 24;    
    return delta;
  }

  getTotal(factura: Factura):number{
    let costetotal = 0;
    
    factura.costes.forEach(coste => {
      costetotal += coste.precio * coste.cantidad
    });
    
    return costetotal;
  }
}
