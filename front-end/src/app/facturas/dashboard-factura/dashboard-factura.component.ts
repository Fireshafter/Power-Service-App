import { Component, OnInit, Input } from '@angular/core';
import { Factura } from '../clases/factura';
import { Router } from '@angular/router';
import { FacturaService } from '../factura.service';
import { Distribuidor } from '../clases/distribuidor';

@Component({
  selector: 'app-dashboard-factura',
  templateUrl: './dashboard-factura.component.html',
  styleUrls: ['./dashboard-factura.component.scss']
})
export class DashboardFacturaComponent implements OnInit {

  constructor(private _router: Router, private _facturaService: FacturaService) { }

  facturas: Factura[];
  distribuidores: Distribuidor[];
  cpfactura = this.facturas;
  ventanaCrear: boolean = false;

  selectedDistribuidores: String[] = [];
  selectedDistStr: String;
  visiblePages: number[] = [];
  selectedPage: number;
  maxPage: number
  size: any;
  pagsize: number = 30;

  ngOnInit() {
    this.getFacturasCount();

    this._facturaService.getDistribuidores().subscribe(res =>{
      this.distribuidores = <Distribuidor[]>res;
      this.distribuidores.forEach(res => this.selectedDistribuidores.push(res.nombre))
      this.arrayToString(this.selectedDistribuidores);
    });
    
    this.selectedPage = 0;

    this.getFacturas();
  }

  getTotal(factura: Factura):number{
    let costetotal = 0;
    
    factura.costes.forEach(coste => {
      costetotal += coste.precio * coste.cantidad
    });
    
    return costetotal;
  }
  
  getFacturas(){
    this._facturaService.listar({pag: this.selectedPage, pagsize: this.pagsize, distribuidores: this.selectedDistStr}).subscribe(res => {
      this.facturas = <Factura[]>res;
    })
  }
  
  getFacturasCount(){
    this._facturaService.getSize({distribuidores: this.selectedDistStr}).subscribe(res =>{
      this.size = res
      this.maxPage = Math.ceil(this.size / this.pagsize);
      
      
      if(this.maxPage > 7)
      this.visiblePages = [1, 2, 3, 4, 5, 6, 7];
      else{
        this.visiblePages = []
        for(let i=0; i<this.maxPage; i++){
          this.visiblePages.push(i+1);
        }
      }
      this.gotopage(0);
    });
  }

  cerrarVentana(){
    this.ventanaCrear = false;
  }

  gotopage(pag: number){    
    this.selectedPage = this.visiblePages[pag]-1;
    this.getFacturas();
  }

  changePag(pagechange: number){
    if(this.selectedPage + pagechange < this.maxPage && this.selectedPage + pagechange > -1)
      this.selectedPage += pagechange;

    if(this.visiblePages[6] < this.selectedPage+1 || this.visiblePages[0] > this.selectedPage+1)
      for(let i=0; i<this.visiblePages.length; i++){
        this.visiblePages[i] += pagechange;
      }
      
    this.getFacturas();
  }

  toggleDistribuidor(nombre: String){
    if(this.selectedDistribuidores.includes(nombre))
      this.selectedDistribuidores.splice(this.selectedDistribuidores.lastIndexOf(nombre), 1);
    else
      this.selectedDistribuidores.push(nombre);

    this.arrayToString(this.selectedDistribuidores)
    this.getFacturas();
    this.getFacturasCount();
    
  }

  arrayToString(array: String[]){
    let string: String = '';

    array.forEach(str => {
      string = string + `${str},`
    })

    this.selectedDistStr = string.substring(0, string.length -1);
  }

}
