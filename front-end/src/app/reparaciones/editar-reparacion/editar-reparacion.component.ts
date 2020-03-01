import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reparacion } from '../clases/reparacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../clases/cliente';
import { Dispositivo } from '../clases/dispositivo';
import { Servicio } from '../clases/servicio';
import { Cambio } from '../clases/cambio';

@Component({
  selector: 'app-editar-reparacion',
  templateUrl: './editar-reparacion.component.html',
  styleUrls: ['./editar-reparacion.component.scss']
})
export class EditarReparacionComponent implements OnInit {

  dispositivo: FormGroup

  constructor(private _formBuilder: FormBuilder) { }

  @Input() target: String;
  @Input() orden: Reparacion;
  @Output() editada = new EventEmitter();

  ngOnInit() {
    this.dispositivo = this._formBuilder.group({
      nombre: [this.orden.dispositivo.nombre, [Validators.required]],
      marca: [this.orden.dispositivo.marca, [Validators.required]],
      estado: ['', [Validators.required]],
      accesorios: ['', [Validators.required]],
      sn: ['', [Validators.required]]
    }); 
  }

  generarDispositivo(){
    if(this.dispositivo.invalid)
      return alert('Formulario invalido');

    let dispositivo = this.dispositivo.value;
    let reparacion = this.orden;
    reparacion.dispositivo = dispositivo;
    reparacion.log.push(new Cambio('Developer', 'Se ha editado el dispositivo', new Date(Date.now())));
    reparacion.ultimaedicion = new Date(Date.now());

    console.log(reparacion);
    this.editada.emit(reparacion)
    this.dispositivo.reset();
  }

}
