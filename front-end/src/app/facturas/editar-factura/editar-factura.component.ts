import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Factura } from '../clases/factura';
import { Costes } from '../clases/costes';
import { FacturaService } from '../factura.service';

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



}
