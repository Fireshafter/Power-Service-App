import { Component, OnInit } from '@angular/core';
import { FacturaService } from './factura.service'
import { Factura } from './clases/factura'

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
export class FacturasComponent implements OnInit {

  constructor(private _facturaService: FacturaService) { }

  facturas: Factura[];

  ngOnInit() {
    this.getFacturas();
  }

  getFacturas(){
    this._facturaService.listar()
    .subscribe(res => {
      this.facturas = <Factura[]>res;
    });
  }
}
