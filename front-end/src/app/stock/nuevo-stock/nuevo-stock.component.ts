import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StockService } from '../stock.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Componente } from '../clases/componente';

@Component({
  selector: 'app-nuevo-stock',
  templateUrl: './nuevo-stock.component.html',
  styleUrls: ['./nuevo-stock.component.scss']
})
export class NuevoStockComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _stockService: StockService) { }

  stock: FormGroup;
  marcas: String[];

  @Output() cerrarVentanaEvent = new EventEmitter;

  marcasSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.marcas.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  ngOnInit() {

    this.stock = this._formBuilder.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      stock: [0, [Validators.required]]
    });

    this._stockService.getMarcas().subscribe(res => this.marcas = <String[]>res);

  }

  crearComponente(){
    if(this.stock.valid){
      console.log(this.stock.value);
      let componente = this.stock.value;
      this._stockService.crear(new Componente(componente.nombre, componente.marca, componente.categoria, componente.stock)).subscribe(res => this.cerrar());
    }
    else
      alert('Formulario inválido');
      
  }

  cerrar(){
    this.cerrarVentanaEvent.emit();    
  }

}
