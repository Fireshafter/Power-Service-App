import { Component, OnInit, Input } from '@angular/core';
import { Factura } from '../clases/factura';

@Component({
  selector: 'app-dashboard-factura',
  templateUrl: './dashboard-factura.component.html',
  styleUrls: ['./dashboard-factura.component.scss']
})
export class DashboardFacturaComponent implements OnInit {

  constructor() { }

  @Input() facturas;
  cpfactura = this.facturas;

  ngOnInit() {
    
  }

  getTotal(factura: Factura):number{
    let costetotal = 0;

    factura.costes.forEach(coste => {
      costetotal += coste.precio * coste.cantidad
    });

    return costetotal;
  }

  prueba(){
    return 'hola'
  }
}
