import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Factura } from '../clases/factura';
import { Costes } from '../clases/costes';
import { FacturaService } from '../factura.service';
import { Distribuidor } from '../clases/distribuidor';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Componente } from '../../stock/clases/componente';
import { ToastrService } from 'ngx-toastr'
import { DialogoConfirmacionService } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.service';

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

  tempComponente: any;
  oldComponente: any;
  updateStocks: boolean = true;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.componentes.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {nombre: string}) => x.nombre;

  inputformatter = (x) => this.checkComponente(x);

  constructor(private _formBuilder: FormBuilder, private _facturaService: FacturaService, private _toastrService: ToastrService, private _dialogoConfirmacion: DialogoConfirmacionService) { }

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

    this._facturaService.getComponentes({categoria: 'vendible'})
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
    this.tempComponente = {nombre: this.fac.costes[i].concepto, stock: 0, oldstock: this.fac.costes[i].cantidad};
    this.oldComponente = {nombre: this.fac.costes[i].concepto, stock: this.fac.costes[i].cantidad};
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

  async deletecoste(i: number){
    if(await this.confirmar('Confirmar borrado', 'Estas seguro de que quieres eliminar este coste?', 'Eliminar')){
      let factura = this.fac;

      if(this.updateStocks)
        this._facturaService.editarStock({nombre: factura.costes[i].concepto, stock: factura.costes[i].cantidad * -1}).subscribe();
      
      factura.costes.splice(i, 1);

      this.actualizarFacturaEvent.emit(factura);
    }
  }

  generarcoste(){
    let numericseparators = [".", ","];
    if(this.coste.invalid || isNaN(parseInt(this.coste.value.precio)) || isNaN(parseInt(this.coste.value.cantidad))|| this.coste.value.cantidad <=0 || this.coste.value.precio <=0 || numericseparators.some(el => this.coste.value.cantidad.toString().includes(el)) )
      return this._toastrService.error('Comprueba que todos los campos estén rellenados correctamente', 'Error de formulario');
    
    let coste = this.coste.value;
    if(coste.precio.toString().includes(','))
      coste.precio = coste.precio.replace(',','.');
    if(coste.concepto.nombre)
      coste.concepto = coste.concepto.nombre
    let factura = this.fac;
    
    switch(this.costeoption){    
      case 'nuevo':
        factura.costes.push(coste);
        
        if(this.updateStocks && this.tempComponente && coste.concepto == this.tempComponente.nombre){
          this.tempComponente.stock = coste.cantidad;
          this._facturaService.editarStock(this.tempComponente).subscribe();
        }
        break;

      case 'editar':
        factura.costes[this.costeindex] = coste;

        if(this.updateStocks && this.tempComponente.oldstock && this.tempComponente.nombre == coste.concepto){
          this.tempComponente.stock = coste.cantidad - this.tempComponente.oldstock;
          
          this._facturaService.editarStock(this.tempComponente).subscribe();
        }

        else if(this.updateStocks && this.tempComponente.nombre == coste.concepto){

          if(this.oldComponente.nombre != this.tempComponente.nombre){
            this.tempComponente.stock = coste.cantidad
            this._facturaService.editarStock(this.tempComponente).subscribe();
            this.oldComponente.stock = this.oldComponente.stock * -1;            
            this._facturaService.editarStock(this.oldComponente).subscribe();
          }
          else{
            this.tempComponente.stock = coste.cantidad - this.oldComponente.stock;
          
            this._facturaService.editarStock(this.tempComponente).subscribe();
          }
            
        }
        this.costeoption = 'nuevo'
        break;
      }
      
      this.actualizarFacturaEvent.emit(factura);
      this._toastrService.success('Se han editado los costes correctamente', 'Actualizado');
      this.coste.reset(); 
  }
  
  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

  generarFactura(){
    if(this.factura.invalid)
      return this._toastrService.error('Comprueba que todos los campos estén rellenados correctamente', 'Error de formulario');

    const datos = this.factura.value;
    let factura: Factura = new Factura(datos.distribuidor, datos.idfactura, this.costes, new Date(this.fecha.year, this.fecha.month - 1, this.fecha.day), datos.comentario, this.fac._id);

    
    this.actualizarFacturaEvent.emit(factura);
    this._toastrService.success('Se ha editado la factura correctamente', 'Actualizado');
    this.cerrar();  
  }

  checkComponente(componente){
    if(componente.nombre){
      this.coste.controls['categoria'].setValue(componente.categoria)
      this.tempComponente = {_id: componente._id, nombre: componente.nombre, stock: 0}
      return componente.nombre
    }
    
    else if(componente)
      return componente
  }

  async confirmar(titulo: string, cuerpo: string, aceptar?: string, denegar?: string){
    let confirmar: boolean;
    await this._dialogoConfirmacion.confirm(titulo, cuerpo, aceptar, denegar)
      .then((confirmed) => confirmar = confirmed)
      .catch(() => confirmar = false)    
    return confirmar;
  }

}
