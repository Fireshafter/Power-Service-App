import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Reparacion } from './clases/reparacion';

@Injectable({
  providedIn: 'root'
})
export class ReparacionService {

  private URL = 'http://localhost:3000';

  constructor(
    private _http:HttpClient
  ) { }

  crear(reparacion: Reparacion){
    return this._http.post(`${this.URL}/reparaciones`, reparacion);
  }

  editar(reparacion: Reparacion){
    return this._http.put(`${this.URL}/reparaciones/${reparacion._id}`, reparacion);
  }

  borrar(reparacion: Reparacion){
    return this._http.delete(`${this.URL}/reparaciones/${reparacion._id}`);
  }

  listar(params: any){
    return this._http.get(`${this.URL}/reparaciones`, {params: params});
  }

  getSize(){
    return this._http.get(`${this.URL}/reparaciones/size`);
  }
  
  getLast(){
    return this._http.get(`${this.URL}/reparaciones/last`);
  }

  verDetalle(id: Number){
    return this._http.get(`${this.URL}/reparaciones/${id}`);
  }
}
