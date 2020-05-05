import { Component, OnInit } from '@angular/core';
import { ReparacionService } from './reparacion.service';
import { Reparacion } from './clases/reparacion';
import { Cliente } from './clases/cliente';
import { Dispositivo } from './clases/dispositivo';
import { Costes } from './clases/costes';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent implements OnInit {
  constructor(private _reparacionService: ReparacionService) { }
  
  resguardos: Reparacion[];

  ngOnInit() {
    this.getResguardos();    
  }

  crearReparacion(reparacion: Reparacion){
    this.resguardos.push(reparacion);
  }

  getResguardos() {
    this._reparacionService.listar()
      .subscribe(res => {
        this.resguardos = <Reparacion[]>res;
      })
  }

}
