import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Reparacion } from '../clases/reparacion';
import { Dispositivo } from '../clases/dispositivo';
import { Cliente } from '../clases/cliente';
import { Servicio } from '../clases/servicio';

@Component({
  selector: 'app-nueva-reparacion',
  templateUrl: './nueva-reparacion.component.html',
  styleUrls: ['./nueva-reparacion.component.scss']
})
export class NuevaReparacionComponent implements OnInit {

  dispositivo: FormGroup;

  @Output() crearNuevaReparacionEvent = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.dispositivo = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });

  }

  generar(){
    if(this.dispositivo.invalid)
      return alert('Formulario invalido');

    let dispositivo = this.dispositivo.value;
    let reparacion:Reparacion = new Reparacion(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100000), 'Pendiente de revisión', new Date(Date.now()), new Date(Date.now()), 'Power Service', new Cliente('Ruben', 'Cabrera Royo', 'Calle Rio Cenia', 6, 12005, 'Castellón', 'España', '644258066', 'fireshafter@hotmail.com'), new Dispositivo(dispositivo.nombre, dispositivo.marca, dispositivo.estado.replace(/\s/g, "").split(',')), 'datos.servicio', 'datos.descripcion', [new Servicio('Mano de obra estándar', 29)], [])

    console.log(reparacion);
    this.crearNuevaReparacionEvent.emit(reparacion)
    this.dispositivo.reset();
  }

}
