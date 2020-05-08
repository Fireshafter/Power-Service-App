import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../clases/factura';
import { FacturaService } from '../factura.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.scss']
})
export class DetalleFacturaComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _facturaService: FacturaService, private _router: Router) { }

  facturaid: any;
  fac: Factura;

  ngOnInit() {
    this.facturaid = this._route.snapshot.paramMap.get('id');
    this._facturaService.verDetalle(this.facturaid).subscribe(fac => {
      this.fac = <Factura>fac;
    })
 
  }

  getTotal(){
    let total = 0;

    this.fac.costes.forEach(coste => {
      total += coste.precio * coste.cantidad;
    })

    return total;
  }

  eliminar(){
    if(confirm('Estás seguro de que quieres borrar PERMANENTEMENTE esta factura?'))
    this._facturaService.borrar(this.facturaid).subscribe(res => {
      this._router.navigate(['/facturas']);
    });
  }

}