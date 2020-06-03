import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Factura } from '../clases/factura';
import { FacturaService } from '../factura.service';
import { DialogoConfirmacionService } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.scss']
})
export class DetalleFacturaComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _facturaService: FacturaService, private _router: Router, private _dialogoConfirmacion: DialogoConfirmacionService, private _toastrService: ToastrService) { }

  facturaid: any;
  fac: Factura;
  target: any;
  edit: boolean = false;

  ngOnInit() {
    this.facturaid = this._route.snapshot.paramMap.get('id');
    this._facturaService.verDetalle(this.facturaid).subscribe(fac => {
      this.fac = <Factura>fac;

      if(fac === null || fac['error'])
        this._router.navigate(['/notfound']);
    })
 
  }

  getTotal(){
    let total = 0;

    this.fac.costes.forEach(coste => {
      total += coste.precio * coste.cantidad;
    })

    return total;
  }

  async eliminar(){
    if(await this.confirmar('Confirmar borrado', '¿Estás seguro de que quieres borrar PERMANENTEMENTE esta factura?', 'Eliminar'))
      this._facturaService.borrar(this.facturaid).subscribe(res => {
        this._toastrService.success('Se ha eliminado la factura correctamente', 'Eliminado');
        this._router.navigate(['/facturas']);
      });
  }

  editar(target: any){
    this.edit = true;
    this.target = target;
  }

  actualizar(factura: Factura){
    this.fac = factura;
    this._facturaService.editar(factura).subscribe();
  }

  async confirmar(titulo: string, cuerpo: string, aceptar?: string, denegar?: string){
    let confirmar: boolean;
    await this._dialogoConfirmacion.confirm(titulo, cuerpo, aceptar, denegar)
      .then((confirmed) => confirmar = confirmed)
      .catch(() => confirmar = false)    
    return confirmar;
  }

}
