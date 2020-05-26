import { Component, OnInit } from '@angular/core';
import { ReparacionService } from './reparacion.service';
import { Reparacion } from './clases/reparacion';


@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styleUrls: ['./reparaciones.component.scss']
})
export class ReparacionesComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }

}
