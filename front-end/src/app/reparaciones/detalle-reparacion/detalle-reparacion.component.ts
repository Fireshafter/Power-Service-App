import { Component, OnInit, Input } from '@angular/core';
import { Reparacion } from '../clases/reparacion';
import { ActivatedRoute, Router } from '@angular/router';
import { ReparacionService } from '../reparacion.service';

@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss']
})
export class DetalleReparacionComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router, private _reparacionService: ReparacionService) { }

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

  eliminar(){
    if(confirm('Estas seguro de que quieres eliminar PERMANENTEMENTE esta orden?')){

      this._reparacionService.borrar(this.rep).subscribe(status => {
        console.log(status);
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

}
