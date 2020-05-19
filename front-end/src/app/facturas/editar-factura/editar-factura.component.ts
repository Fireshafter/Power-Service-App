import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Factura } from '../clases/factura';
import { Costes } from '../clases/costes';
import { FacturaService } from '../factura.service';
import { Distribuidor } from '../clases/distribuidor';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Componente } from '../clases/componente';

@Component({
  selector: 'app-editar-factura',
  templateUrl: './editar-factura.component.html',
  styleUrls: ['./editar-factura.component.scss']
})
export class EditarFacturaComponent implements OnInit {

  @Input() target;
  @Input() fac;
  @Output() cerrarVentanaEvent = new EventEmitter();
  @Output() actualizarFacturaEvent = new EventEmitter();

  factura: FormGroup;
  coste: FormGroup;

  costes: Costes[];
  fecha: any
  costeindex: number;
  costeoption: String = 'neutral';
  distribuidores: Distribuidor[];
  componentes: Componente[];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.componentes.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {nombre: string}) => x.nombre;

  inputformatter = (x) => this.checkComponente(x);

  constructor(private _formBuilder: FormBuilder, private _facturaService: FacturaService) { }

  ngOnInit() {
    let fecha = new Date(this.fac.fecha);

    this.fecha = {
      day: fecha.getDate(),
      month: fecha.getMonth()+1,
      year: fecha.getFullYear()
    }

    this.factura = this._formBuilder.group({
      distribuidor: [this.fac.distribuidor, [Validators.required]],
      idfactura: [this.fac.idfactura, [Validators.required]],
      comentario: [this.fac.comentario, [Validators.required]],
      fecha: ['', [Validators.required]]
    });

    this.costes = this.fac.costes;

    this._facturaService.getDistribuidores()
    .subscribe( res => {
      this.distribuidores = <Distribuidor[]>res;
    });

    this._facturaService.getComponentes()
    .subscribe( res => {
      this.componentes = <Componente[]>res;
    });
  }

  editcoste(i: number){
    this.coste = this._formBuilder.group({
      concepto: [this.fac.costes[i].concepto, [Validators.required]],
      cantidad: [this.fac.costes[i].cantidad, [Validators.required]],
      categoria: [this.fac.costes[i].categoria, [Validators.required]],
      precio: [this.fac.costes[i].precio, [Validators.required]],
    });
    this.costeindex = i;
    this.costeoption = 'editar';
  }

  newcoste(){

    this.coste = this._formBuilder.group({
      concepto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });

    this.costeoption = 'nuevo';
  }

  deletecoste(i: number){
    if(confirm('Estas seguro de que quieres eliminar este coste?')){
      let factura = this.fac;
      factura.costes.splice(i, 1);

      console.log(factura);
      

      this.actualizarFacturaEvent.emit(factura);
    }
  }

  generarcoste(){
    let numericseparators = [".", ","];
    if(this.coste.invalid || isNaN(parseInt(this.coste.value.precio)) || isNaN(parseInt(this.coste.value.cantidad)) || numericseparators.some(el => this.coste.value.cantidad.toString().includes(el)) )
      return alert('Formulario inválido');
    
    let coste = this.coste.value;
    if(coste.precio.toString().includes(','))
      coste.precio = coste.precio.replace(',','.');
    if(coste.concepto.nombre)
      coste.concepto = coste.concepto.nombre
    let factura = this.fac;
    
    switch(this.costeoption){    
      case 'nuevo':
        factura.costes.push(coste);
        break;

      case 'editar':
        factura.costes[this.costeindex] = coste;
        this.costeoption = 'nuevo'
        break;
      }
      
      this.coste.reset(); 
  }

  enviarCambios(){
    let factura = this.fac;

    console.log(factura);
    

    this.actualizarFacturaEvent.emit(factura);
    this.cerrar();
  }
  
  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

  generarFactura(){
    const datos = this.factura.value;
    let factura: Factura = new Factura(datos.distribuidor, datos.idfactura, this.costes, new Date(this.fecha.year, this.fecha.month - 1, this.fecha.day), datos.comentario, this.fac._id);

    console.log(factura);
    
    this.actualizarFacturaEvent.emit(factura);
    this.cerrar();  
  }

checkComponente(componente){
  if(componente.nombre){
    this.coste.controls['categoria'].setValue(componente.categoria)
    return componente.nombre
  }
  
  else if(componente)
    return componente
}

}
