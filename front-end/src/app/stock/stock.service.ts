import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Componente } from './clases/componente';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private URL = 'http://localhost:3000';

  constructor(
    private _http:HttpClient
  ) { }

  crear(componente: Componente){
    return this._http.post(`${this.URL}/componentes`, componente);
  }
  
  editar(componente: Componente){
    return this._http.put(`${this.URL}/componentes/${componente._id}`, componente);
  }
  
  borrar(id: Number){
    return this._http.delete(`${this.URL}/componentes/${id}`);
  }

  listar(params: any){
    return this._http.get(`${this.URL}/componentes`, {params: params});
  }

  verDetalle(id: Number){
    return this._http.get(`${this.URL}/componentes/${id}`);
  }

  getMarcas(){
    return this._http.get(`${this.URL}/componentes/marcas`);
  }

}
