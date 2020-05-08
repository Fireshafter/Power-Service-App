import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Costes } from '../clases/costes'
import { Factura } from '../clases/factura';
import { FacturaService } from '../factura.service';
import { Router } from '@angular/router';


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

  @Output() cerrarVentanaEvent = new EventEmitter();

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
  }

  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

  generarFactura(){
    let fac = this.factura.value;
    let factura = new Factura(fac.distribuidor, fac.idfactura, this.costes, new Date(Date.now()), fac.comentario);

    console.log(factura);
    this.crearFactura(factura);
  }

  generarCoste(){

    if(!this.coste.invalid && this.checkCoste(this.coste.value)){
      let coste = this.coste.value;
      this.costes.push(coste);
      this.coste.reset();
    }
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
    
  }

  checkCoste(coste){
    if(!isNaN(coste.cantidad) && !isNaN(coste.precio))
      return true;
    else
      return false;
  }

}
