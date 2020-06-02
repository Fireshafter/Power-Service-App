import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Componente } from '../clases/componente';

@Component({
  selector: 'app-dashboard-stock',
  templateUrl: './dashboard-stock.component.html',
  styleUrls: ['./dashboard-stock.component.scss']
})
export class DashboardStockComponent implements OnInit {

  constructor(private _stockService: StockService) { }

  pantallas: Componente[]
  baterias: Componente[]
  tecnicoentienda: Componente[]
  consumointerno: Componente[]
  marcas: String[];
  selectedMarcas: String[];
  selectedMarcasStr: String;
  searchTerm: String;
  ventanaCrear: boolean = false;
  ventanaEditar: boolean = false;
  editTarget: Componente;

  ngOnInit() {
    this.getComponentes();
    this.getMarcas();

    this._stockService.getMarcas().subscribe(res => {
      this.selectedMarcas = <String[]>res;
    })

  }

  getComponentes(){
    this._stockService.listar({categoria: 'Pantallas', marcas: this.selectedMarcasStr, searchTerm: this.searchTerm}).subscribe(res => this.pantallas = <Componente[]>res);
    this._stockService.listar({categoria: 'Baterias', marcas: this.selectedMarcasStr, searchTerm: this.searchTerm}).subscribe(res => this.baterias = <Componente[]>res);
    this._stockService.listar({categoria: 'Técnico en tienda', marcas: this.selectedMarcasStr, searchTerm: this.searchTerm}).subscribe(res => this.tecnicoentienda = <Componente[]>res);
    this._stockService.listar({categoria: 'Consumo interno', searchTerm: this.searchTerm}).subscribe(res => this.consumointerno = <Componente[]>res);
  }

  getMarcas(){
    this._stockService.getMarcas().subscribe(res => {
      this.marcas = <String[]>res;
    })
  }

  toggleMarca(marca: String){
    if(this.selectedMarcas.includes(marca))
      this.selectedMarcas.splice(this.selectedMarcas.indexOf(marca), 1);
    else
      this.selectedMarcas.push(marca);

    this.arrayToString();
    this.getComponentes();
  }

  arrayToString(){
    let string: String = '';

    this.selectedMarcas.forEach(str => {
      string = string + `${str},`
    })

    this.selectedMarcasStr = string.substring(0, string.length -1);
  }

  editarComponente(componente: Componente){
    this.editTarget = componente;
    this.ventanaEditar = true;
  }

  cerrarVentanaCrear(){
    this.ventanaCrear = false;
    this.getComponentes();
  }

  cerrarVentanaEditar(){
    this.ventanaEditar = false;
    this.getComponentes();
  }
}
