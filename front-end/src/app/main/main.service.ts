import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private URL = 'http://localhost:3000'

  constructor(
    private _http: HttpClient
  ) { }
  
  getStocks(params){
    return this._http.get(`${this.URL}/componentes/main`, {params: params})
  }

  getReparaciones(){
    return this._http.get(`${this.URL}/reparaciones/main/`)
  }

  getFacturas(){
    return this._http.get(`${this.URL}/facturas/main`)
  }

}
