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

  ventanaCrear: Boolean = false;

  constructor(private _router: Router, private _reparacionService: ReparacionService) { }

  ngOnInit() {
    this.ventanaCrear = true;
  }

  verDetalle(id: number){
    this._router.navigate(['reparaciones/detalles', {id: id}])
  }

  cerrarVentana(){
    this.ventanaCrear = false;
  }

  crear(reparacion: Reparacion){
    this._reparacionService.crear(reparacion).subscribe(() => console.log('Creado'));
  }

}
