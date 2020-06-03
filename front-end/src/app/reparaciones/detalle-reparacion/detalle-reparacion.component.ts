import { Component, OnInit, Input } from '@angular/core';
import { Reparacion } from '../clases/reparacion';
import { ActivatedRoute, Router } from '@angular/router';
import { ReparacionService } from '../reparacion.service';
import { DialogoConfirmacionService } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss']
})
export class DetalleReparacionComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router, private _reparacionService: ReparacionService, private _dialogoConfirmacion: DialogoConfirmacionService, private _toastrService: ToastrService) { }

  editable: Boolean = false;
  edittarget: String;
  reparacionid: any;
  rep: Reparacion;
  
  ngOnInit() {
    this.reparacionid = this._route.snapshot.paramMap.get('id');
    this._reparacionService.verDetalle(this.reparacionid).subscribe(rep => {
      this.rep = <Reparacion>rep;

      if(rep === null || rep['error'])
        this._router.navigate(['/notfound']);
    });
    
  }

  editar(target: String){
    this.editable = true;
    this.edittarget = target;
  }

  async eliminar(){
    if(await this.confirmar('Confirmar borrado', 'Estas seguro de que quieres eliminar PERMANENTEMENTE esta orden?', 'Eliminar')){

      this._reparacionService.borrar(this.rep).subscribe(status => {
        this._toastrService.success('Se ha eliminado la orden correctamente', 'Eliminado');
        this._router.navigate(['/reparaciones']);
      })
    }    
  }

  actualizar(reparacion: Reparacion){
    this._reparacionService.editar(reparacion).subscribe();
  }

  cerrarVentana(){
    this.editable = false;
  }

  async confirmar(titulo: string, cuerpo: string, aceptar?: string, denegar?: string){
    let confirmar: boolean;
    await this._dialogoConfirmacion.confirm(titulo, cuerpo, aceptar, denegar)
      .then((confirmed) => confirmar = confirmed)
      .catch(() => confirmar = false)    
    return confirmar;
  }

}
