import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Componente } from '../clases/componente';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.scss']
})
export class EditarStockComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _stockService: StockService) { }

  @Input() componente: Componente;
  @Output() cerrarVentanaEvent = new EventEmitter;
  
  marcas: String[];
  stock: FormGroup;

  marcasSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.marcas.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  ngOnInit() {

    this.stock = this._formBuilder.group({
      nombre: [this.componente.nombre, [Validators.required]],
      marca: [this.componente.marca, [Validators.required]],
      categoria: [this.componente.categoria, [Validators.required]],
      stock: [this.componente.stock, [Validators.required]]
    });

    this._stockService.getMarcas().subscribe(res => this.marcas = <String[]>res);
    
  }

  editarComponente(){
    if(this.stock.valid){
      let componente = this.stock.value;
      this._stockService.editar(new Componente(componente.nombre, componente.marca, componente.categoria, componente.stock, this.componente._id)).subscribe(res => this.cerrar());
    }
    else
      alert('Formulario no válido')
  }

  cerrar(){
    this.cerrarVentanaEvent.emit();
  }

}
