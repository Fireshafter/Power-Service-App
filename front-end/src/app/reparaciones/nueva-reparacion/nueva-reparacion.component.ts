import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Reparacion } from '../clases/reparacion';
import { Cambio } from '../clases/cambio';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nueva-reparacion',
  templateUrl: './nueva-reparacion.component.html',
  styleUrls: ['./nueva-reparacion.component.scss']
})
export class NuevaReparacionComponent implements OnInit {

  reparacion: FormGroup;
  dispositivo: FormGroup;
  cliente: FormGroup;
  step: number;

  @Output() crearReparacionEvent = new EventEmitter();
  @Output() cerrarVentanaEvent = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private _toastrService: ToastrService) { }

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

    this.step = 0;

  }

  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

  generarOrden(){
    let orden = this.reparacion.value;
    let dispositivo = this.dispositivo.value;
    let cliente = this.cliente.value;

    let reparacion = new Reparacion(34000, orden.estado, new Date(Date.now()), new Date(Date.now()), orden.taller, cliente, dispositivo, orden.titulo, orden.descripcion, [], [new Cambio('Developer', 'Creación de la orden', new Date(Date.now()))]);

    let estado = dispositivo.estado + ''
    let accesorios = dispositivo.accesorios + ''

    reparacion.dispositivo.estado = estado.split(',');
    reparacion.dispositivo.accesorios = accesorios.split(',');

    this.crearReparacionEvent.emit(reparacion);
    this._toastrService.success('Se ha creado la orden correctamente', 'Creada');
    this.cerrar();
  }

  stepper(){
    const formularios = [this.reparacion, this.dispositivo, this.cliente]

    if(formularios[this.step].invalid)
      return this._toastrService.error('Comprueba que todos los campos estén rellenados correctamente', 'Error de formulario');

    if(this.step < 2){
      this.step++;
    }
    else
      this.generarOrden();
  }

}
