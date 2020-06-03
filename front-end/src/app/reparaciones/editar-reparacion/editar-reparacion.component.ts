import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Reparacion } from '../clases/reparacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cambio } from '../clases/cambio';
import { Componente } from 'src/app/stock/clases/componente';
import { ReparacionService } from '../reparacion.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-reparacion',
  templateUrl: './editar-reparacion.component.html',
  styleUrls: ['./editar-reparacion.component.scss']
})
export class EditarReparacionComponent implements OnInit {
  

  dispositivo: FormGroup
  cliente: FormGroup
  ordenedit: FormGroup
  coste: FormGroup

  constructor(private _formBuilder: FormBuilder, private _reparacionService: ReparacionService) { }

  @Input() target: String;
  @Input() orden: Reparacion;
  @Output() actualizacionEvent = new EventEmitter();
  @Output() cerrarVentanaEvent = new EventEmitter();
  costeindex: number;
  costeoption: String = 'neutral';

  componentes: Componente[];
  tempComponente: any;
  oldComponente: any;
  updateStocks:boolean= true;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.componentes.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

    formatter = (x: {nombre: string}) => x.nombre;
    inputformatter = (x) => this.checkComponente(x);


  ngOnInit() {
    this.dispositivo = this._formBuilder.group({
      nombre: [this.orden.dispositivo.nombre, [Validators.required]],
      marca: [this.orden.dispositivo.marca, [Validators.required]],
      estado: [this.orden.dispositivo.estado, [Validators.required]],
      accesorios: [this.orden.dispositivo.accesorios],
      sn: [this.orden.dispositivo.sn, [Validators.required]]
    });
    
    this.cliente = this._formBuilder.group({
      nombre: [this.orden.cliente.nombre, [Validators.required]],
      apellidos: [this.orden.cliente.apellidos, [Validators.required]],
      calle: [this.orden.cliente.calle, [Validators.required]],
      numero: [this.orden.cliente.numero, [Validators.required]],
      cpostal: [this.orden.cliente.codigopostal, [Validators.required]],
      ciudad: [this.orden.cliente.ciudad, [Validators.required]],
      telefono: [this.orden.cliente.telefono, [Validators.required]],
      correo: [this.orden.cliente.correo, [Validators.required, Validators.email]]
    });
    
    this.ordenedit = this._formBuilder.group({
      titulo: [this.orden.titulo, [Validators.required]],
      descripcion: [this.orden.descripcion, [Validators.required]],
      estado: [this.orden.estado, [Validators.required]],
      taller: [this.orden.taller, [Validators.required]]
    });

    this._reparacionService.getComponentes({categoria: 'vendible'}).subscribe(res => this.componentes = <Componente[]>res);
  }

  generarDispositivo(){
    if(this.dispositivo.invalid)
      return alert('Formulario invalido')

    let dispositivo = this.dispositivo.value;
    let reparacion = this.orden;
    reparacion.dispositivo = dispositivo;
    let estado = dispositivo.estado + ''
    let accesorios = dispositivo.accesorios + ''
    reparacion.dispositivo.estado = estado.split(',')
    reparacion.dispositivo.accesorios = accesorios.split(',')

    reparacion.log.push(new Cambio('Developer', 'Se ha editado el dispositivo', new Date(Date.now())))
    reparacion.ultimaedicion = new Date(Date.now());
    
    console.log(reparacion);
    this.actualizacionEvent.emit(reparacion);
    this.dispositivo.reset();
    
    this.cerrar()
  }

  generarCliente(){
    if(this.cliente.invalid)
      return alert('Formulario invalido')

    let cliente = this.cliente.value;
    let reparacion = this.orden;
    reparacion.cliente = cliente;
    console.log(this.cliente.value)

    reparacion.log.push(new Cambio('Developer', 'Se ha editado el cliente', new Date(Date.now())))
    reparacion.ultimaedicion = new Date(Date.now());

    this.actualizacionEvent.emit(reparacion);

    this.cerrar();
  }

  generarOrden(){
    if(this.ordenedit.invalid)
      return alert('Formulario inválido');

    let orden = this.ordenedit.value;
    let reparacion = this.orden;
    reparacion.titulo = orden.titulo;
    reparacion.descripcion = orden.descripcion;
    reparacion.estado = orden.estado;
    reparacion.taller = orden.taller;

    reparacion.log.push(new Cambio('Developer', 'Se ha editado la orden', new Date(Date.now())));
    reparacion.ultimaedicion = new Date(Date.now()); 

    this.actualizacionEvent.emit(reparacion);

    this.cerrar();
  }
  
  editcoste(i: number){
    this.coste = this._formBuilder.group({
      servicio: [this.orden.costes[i].servicio, [Validators.required]],
      coste: [this.orden.costes[i].coste, [Validators.required]],
    });
    this.costeindex = i;
    this.tempComponente = {nombre: this.orden.costes[i].servicio, stock: -1};
    this.oldComponente = {nombre: this.orden.costes[i].servicio, stock: 1};
    this.costeoption = 'editar';
  }

  newcoste(){

    this.coste = this._formBuilder.group({
      servicio: [[''], [Validators.required]],
      coste: [[''], [Validators.required]],
    });

    this.costeoption = 'nuevo';
  }

  deletecoste(i: number){
    if(confirm('Estas seguro de que quieres eliminar este coste?')){
      let reparacion = this.orden;
      
      if(this.updateStocks)
        this._reparacionService.editarStock({nombre: reparacion.costes[i].servicio, stock: 1}).subscribe();
      
        reparacion.costes.splice(i, 1);

      this.actualizacionEvent.emit(reparacion);
    }
  }

  generarcoste(){
    if(this.coste.invalid || isNaN(parseInt(this.coste.value.coste)))
      return alert('Formulario inválido');
    
    let coste = this.coste.value;

    if(coste.servicio.nombre)
      coste.servicio = coste.servicio.nombre;
    
    if(coste.coste.toString().includes(','))
      coste.coste = coste.coste.replace(',','.');
    
    let reparacion = this.orden;

    console.log(this.orden);

    
    switch(this.costeoption){    
      case 'nuevo':
        reparacion.costes.push(coste);

        if(this.updateStocks && this.tempComponente && coste.servicio == this.tempComponente.nombre)
          this._reparacionService.editarStock(this.tempComponente).subscribe()
          
        break;

      case 'editar':
        reparacion.costes[this.costeindex] = coste;
        this.costeoption = 'nuevo'

        console.log(this.tempComponente.nombre, this.oldComponente.nombre);
        this.tempComponente.nombre = coste.servicio;

        if(this.updateStocks && this.tempComponente.nombre != this.oldComponente.nombre){
          this._reparacionService.editarStock(this.tempComponente).subscribe();
          this._reparacionService.editarStock(this.oldComponente).subscribe();
        }          

        break;
      }

    reparacion.log.push(new Cambio('Developer', 'Se han editado los costes', new Date(Date.now())));
    reparacion.ultimaedicion = new Date(Date.now());    

    this.actualizacionEvent.emit(reparacion);
      
    this.coste.reset(); 
  }

  checkComponente(componente){
    if(componente.nombre){
      this.tempComponente = {_id: componente._id, nombre: componente.nombre, stock: -1};      
      return componente.nombre;
    }
    
    else if(componente)
      return componente;
  }

  cerrar(){
    this.cerrarVentanaEvent.emit()
  }
}
