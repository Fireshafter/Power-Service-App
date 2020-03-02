import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReparacionService } from '../reparacion.service';
import { Reparacion } from '../clases/reparacion';

@Component({
  selector: 'app-dashboard-reparacion',
  templateUrl: './dashboard-reparacion.component.html',
  styleUrls: ['./dashboard-reparacion.component.scss']
})
export class DashboardReparacionComponent implements OnInit {

  @Input() resguardos;
  ahora: Date;

  ventanaCrear: Boolean = false;

  constructor(private _router: Router, private _reparacionService: ReparacionService) { }

  ngOnInit() {
    this.ahora = new Date(Date.now());
  }

  verDetalle(id: number){
    console.log('atun');
    
    this._router.navigate(['reparaciones/detalles', {id: id}])
  }

  cerrarVentana(){
    this.ventanaCrear = false;
  }

  crear(reparacion: Reparacion){
    reparacion.orden = this.resguardos[this.resguardos.length - 1].orden + 1;
    this._reparacionService.crear(reparacion).subscribe(() => console.log('Creado'));
  }

  getDays(date: any){
    let data = new Date(date)
    let delta = (this.ahora.getTime() - data.getTime()) / 1000 / 60 / 60 / 24;    
    return delta;
  }

}
