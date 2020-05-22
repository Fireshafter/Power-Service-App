import { Component, OnInit, Input } from '@angular/core';
import { Factura } from '../clases/factura';
import { Router } from '@angular/router';
import { FacturaService } from '../factura.service';

@Component({
  selector: 'app-dashboard-factura',
  templateUrl: './dashboard-factura.component.html',
  styleUrls: ['./dashboard-factura.component.scss']
})
export class DashboardFacturaComponent implements OnInit {

  constructor(private _router: Router, private _facturaService: FacturaService) { }

  facturas: Factura[];
  cpfactura = this.facturas;
  ventanaCrear: boolean = false;

  visiblePages: number[] = [];
  selectedPage: number;
  maxPage: number
  size: any;
  pagsize: number = 30

  ngOnInit() {
    this._facturaService.getSize().subscribe(res =>{
      this.size = res
      this.maxPage = Math.ceil(this.size / this.pagsize);
      

      if(this.maxPage > 7)
        this.visiblePages = [1, 2, 3, 4, 5, 6, 7];
      else{
        for(let i=0; i<this.maxPage; i++){
          this.visiblePages.push(i+1);
        }
      }
    })



    console.log(this.size);
    
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
    this._facturaService.listar({pag: this.selectedPage, pagsize: this.pagsize}).subscribe(res => {
      this.facturas = <Factura[]>res;
    })
    
  }

  cerrarVentana(){
    this.ventanaCrear = false;
  }

  gotopage(pag: number){
    console.log(pag);
    
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
    console.log(this.selectedPage);
  }
}
