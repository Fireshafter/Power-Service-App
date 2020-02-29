import { Component, OnInit, Input } from '@angular/core';
import { Reparacion } from '../clases/reparacion';
import { Cliente } from '../clases/cliente';
import { Dispositivo } from '../clases/dispositivo';
import { Servicio } from '../clases/servicio';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss']
})
export class DetalleReparacionComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _router: Router) { }

  editable: Boolean = false;
  edittarget: String;
  reparacionid: any;
  rep: Reparacion = new Reparacion(0, 34567, 'Pendiente de revisión', new Date("2020-02-27"), new Date('2020-02-28'), 'Power Service', new Cliente('Emilio', 'Sansano Romero', 'Tenerias', 7, 12001, 'Castellón', 'España', '651244681', 'emilio.sansano@agilcentros.es'), new Dispositivo('iPhone 7 Plus', 'Apple', ['Abierto/Usado', 'Rallado', 'Agrietado']), 'Reparación pantalla original', 'Viene con la pantalla rota, cambiar por original', [new Servicio('Pantalla iPhone 7 Plus original', 79.99)], []);

  ngOnInit() {
    this.reparacionid = this._route.snapshot.paramMap.get('id');
  }

  editar(target: String){
    this.editable = true;
    this.edittarget = target;
  }

  eliminar(){
    this.reparacionid =+1;
  }

  actualizar(reparacion: Reparacion){
    this.rep = reparacion;
    this.editable = false;
  }

}
