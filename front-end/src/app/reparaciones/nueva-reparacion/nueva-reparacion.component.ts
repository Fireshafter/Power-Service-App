import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Reparacion } from '../clases/reparacion';
import { Dispositivo } from '../clases/dispositivo';
import { Cliente } from '../clases/cliente';
import { Servicio } from '../clases/servicio';
import { Cambio } from '../clases/cambio';

@Component({
  selector: 'app-nueva-reparacion',
  templateUrl: './nueva-reparacion.component.html',
  styleUrls: ['./nueva-reparacion.component.scss']
})
export class NuevaReparacionComponent implements OnInit {

  reparacion: FormGroup;
  dispositivo: FormGroup;
  cliente: FormGroup;

  @Output() crearReparacionEvent = new EventEmitter();
  @Output() cerrarVentanaEvent = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.reparacion = this._formBuilder.group({
      estado: ['', [Validators.required]],
      taller: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    });

    this.dispositivo = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      accesorios: [''],
      sn: ['', [Validators.required]]
    });
    
    this.cliente = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      codigopostal: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]]
    });

  }

  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

  generarOrden(){
    if(this.reparacion.invalid || this.dispositivo.invalid || this.cliente.invalid)
      return alert('Formulario invalido')

    let orden = this.reparacion.value;
    let dispositivo = this.dispositivo.value;
    let cliente = this.cliente.value;

    let reparacion = new Reparacion(34597, orden.estado, new Date(Date.now()), new Date(Date.now()), orden.taller, cliente, dispositivo, orden.titulo, orden.descripcion, [], [new Cambio('Developer', 'Creación de la orden', new Date(Date.now()))]);

    let estado = dispositivo.estado + ''
    let accesorios = dispositivo.accesorios + ''

    reparacion.dispositivo.estado = estado.split(',');
    reparacion.dispositivo.accesorios = accesorios.split(',');

    console.log(reparacion);
    this.crearReparacionEvent.emit(reparacion);
  }

  // generar(){
  //   if(this.dispositivo.invalid)
  //     return alert('Formulario invalido');

  //   let dispositivo = this.dispositivo.value;
  //   let reparacion:Reparacion = new Reparacion(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100000), 'Pendiente de revisión', new Date(Date.now()), new Date(Date.now()), 'Power Service', new Cliente('Ruben', 'Cabrera Royo', 'Calle Rio Cenia', 6, 12005, 'Castellón', 'España', '644258066', 'fireshafter@hotmail.com'), new Dispositivo(dispositivo.nombre, dispositivo.marca, dispositivo.estado.replace(/\s/g, "").split(',')), 'datos.servicio', 'datos.descripcion', [new Servicio('Mano de obra estándar', 29)], [])

  //   console.log(reparacion);
  //   this.crearNuevaReparacionEvent.emit(reparacion)
  //   this.dispositivo.reset();
  // }

}
