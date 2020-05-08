import { Component, OnInit, Input } from '@angular/core';
import { Factura } from '../clases/factura';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-factura',
  templateUrl: './dashboard-factura.component.html',
  styleUrls: ['./dashboard-factura.component.scss']
})
export class DashboardFacturaComponent implements OnInit {

  constructor(private _router: Router) { }

  @Input() facturas;
  cpfactura = this.facturas;
  ventanaCrear: boolean = false;

  ngOnInit() {
    
  }

  verDetalle(id: number){
    this._router.navigate(['facturas/detalles', {id: id}])
  }

  getTotal(factura: Factura):number{
    let costetotal = 0;

    factura.costes.forEach(coste => {
      costetotal += coste.precio * coste.cantidad
    });

    return costetotal;
  }

  cerrarVentana(){
    this.ventanaCrear = false;
  }
}
