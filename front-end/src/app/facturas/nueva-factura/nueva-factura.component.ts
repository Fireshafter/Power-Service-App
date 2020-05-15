import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Costes } from '../clases/costes'
import { Factura } from '../clases/factura';
import { FacturaService } from '../factura.service';
import { Router } from '@angular/router';
import { Distribuidor } from '../clases/distribuidor';
import { Componente } from '../clases/componente';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.component.html',
  styleUrls: ['./nueva-factura.component.scss']
})
export class NuevaFacturaComponent implements OnInit {

  factura: FormGroup;
  coste: FormGroup;
  costes: Costes[] = [];
  step: number;
  distribuidores: Distribuidor[];
  componentes: Componente[];
  componente: Componente = new Componente('', '');

  @Output() cerrarVentanaEvent = new EventEmitter();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.componentes.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {nombre: string}) => x.nombre;

  constructor(private _formBuilder: FormBuilder, private _facturaService: FacturaService, private _router: Router) { }

  ngOnInit() {

    this.factura = this._formBuilder.group({
      distribuidor: ['', [Validators.required]],
      idfactura: ['', [Validators.required]],
      comentario: ['', [Validators.required]]
    });

    this.coste = this._formBuilder.group({
      concepto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    });

    this.step = 0;

    this._facturaService.getDistribuidores()
      .subscribe( res => {
        this.distribuidores = <Distribuidor[]>res;
      });

    this._facturaService.getComponentes()
      .subscribe( res => {
        this.componentes = <Componente[]>res;
      });

  }

  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

  generarFactura(){
    let fac = this.factura.value;
    let factura = new Factura(fac.distribuidor, fac.idfactura, this.costes, new Date(Date.now()), fac.comentario);

    this.crearFactura(factura);
  }

  generarCoste(){

    if(!this.coste.invalid && this.checkCoste(this.coste.value)){
      let coste = this.coste.value;   

      if(coste.concepto.nombre)
        coste.concepto = coste.concepto.nombre
      
      this.costes.push(coste);
      this.coste.reset();
    }
    else
      alert('Formulario inválido')
  }

  crearFactura(factura: Factura){
    this._facturaService.crear(factura).subscribe(fac => {
      this._router.navigate(['facturas/detalles', fac])
    });
  }

  stepper(){
    if(this.step<1 && !this.factura.invalid)
      this.step ++

    else if(this.step == 1)
      this.generarFactura();
    
    else
      alert('Formulario inválido')
  }

  checkCoste(coste){
    if(!isNaN(coste.cantidad) && !isNaN(coste.precio))
      return true;
    else
      return false;
  }

  checkCategoria(){
    console.log(this.coste.value.concepto);    
    
    if(this.coste.value.concepto.nombre){
      this.coste.controls['categoria'].setValue(this.coste.value.concepto.categoria)
    }
  }

}
