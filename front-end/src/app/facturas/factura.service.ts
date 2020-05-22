import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Factura } from './clases/factura'

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private URL = 'http://localhost:3000'

  constructor(
    private _http: HttpClient
  ) { }

  crear(factura: Factura){
    return this._http.post(`${this.URL}/facturas`, factura);
  }
  
  editar(factura: Factura){
    return this._http.put(`${this.URL}/facturas/${factura._id}`, factura);
  }

  borrar(_id: number){
    return this._http.delete(`${this.URL}/facturas/${_id}`);
  }

  listar(paginfo: any){
    return this._http.get(`${this.URL}/facturas`, {params: paginfo});
  }

  verDetalle(id: Number){
    return this._http.get(`${this.URL}/facturas/${id}`);
  }

  getDistribuidores(){
    return this._http.get(`${this.URL}/distribuidores`)
  }
  
  getComponentes(){
    return this._http.get(`${this.URL}/componentes`)
  }

  getSize(){
    return this._http.get(`${this.URL}/facturas/size`)
  }
}
