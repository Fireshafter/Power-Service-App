import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Reparacion } from './clases/reparacion';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReparacionService {

  constructor(
    private _http:HttpClient
  ) { }

  crear(reparacion: Reparacion){
    return this._http.post('/reparaciones', reparacion).toPromise();
  }

  editar(reparacion: Reparacion){
    return this._http.put(`/reparaciones/${reparacion._id}`, reparacion).toPromise();
  }

  borrar(reparacion: Reparacion){
    return this._http.delete(`/reparaciones/${reparacion._id}`).toPromise();
  }

  listar(){
    return this._http.get(`/reparaciones/`).toPromise();
  }

  mostrar(reparacion: Reparacion){
    return this._http.get(`/reparaciones/${reparacion._id}`).toPromise();
  }
}
