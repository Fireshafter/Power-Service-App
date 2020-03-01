import { Component, OnInit, Input } from '@angular/core';
import { Reparacion } from '../clases/reparacion';
import { Cliente } from '../clases/cliente';
import { Dispositivo } from '../clases/dispositivo';
import { Servicio } from '../clases/servicio';
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
    });
  }

  editar(target: String){
    this.editable = true;
    this.edittarget = target;
  }

  eliminar(){
    this.reparacionid =+1;
  }

  actualizar(reparacion: Reparacion){
    this._reparacionService.editar(reparacion).subscribe();
    this.editable = false;
  }

}
