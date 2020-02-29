import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-reparacion',
  templateUrl: './dashboard-reparacion.component.html',
  styleUrls: ['./dashboard-reparacion.component.scss']
})
export class DashboardReparacionComponent implements OnInit {

  @Input() resguardos;

  constructor(private _router: Router) { }

  ngOnInit() {}

  verDetalle(id: number){
    this._router.navigate(['reparaciones/detalles', {id: id}])
  }

}
