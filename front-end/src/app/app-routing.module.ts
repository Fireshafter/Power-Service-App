import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardReparacionComponent } from './reparaciones/dashboard-reparacion/dashboard-reparacion.component';
import { DetalleReparacionComponent } from './reparaciones/detalle-reparacion/detalle-reparacion.component';
import {DashboardFacturaComponent} from './facturas/dashboard-factura/dashboard-factura.component';
import {DetalleFacturaComponent} from './facturas/detalle-factura/detalle-factura.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {DashboardStockComponent} from './stock/dashboard-stock/dashboard-stock.component'
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path: 'home', component: MainComponent},
  {path: 'reparaciones', component: DashboardReparacionComponent},
  {path: 'reparaciones/detalles', component: DetalleReparacionComponent},
  {path: 'facturas', component: DashboardFacturaComponent},
  {path: 'facturas/detalles', component: DetalleFacturaComponent},
  {path: 'stock', component: DashboardStockComponent},
  {path: 'notfound', component: NotfoundComponent},
  {path: '**', redirectTo: 'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
