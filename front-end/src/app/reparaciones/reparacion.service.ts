import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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

  listar(){
    return this._http.get(`${this.URL}/reparaciones`);
  }

  mostrar(reparacion: Reparacion){
    return this._http.get(`${this.URL}/reparaciones/${reparacion._id}`);
  }

  verDetalle(id: Number){
    return this._http.get(`${this.URL}/reparaciones/${id}`);
  }
}
