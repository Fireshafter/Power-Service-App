import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { EditarReparacionComponent } from './reparaciones/editar-reparacion/editar-reparacion.component';
import { NuevaReparacionComponent } from './reparaciones/nueva-reparacion/nueva-reparacion.component';
import { DetalleReparacionComponent } from './reparaciones/detalle-reparacion/detalle-reparacion.component';
import {DashboardFacturaComponent} from './facturas/dashboard-factura/dashboard-factura.component';
import {DetalleFacturaComponent} from './facturas/detalle-factura/detalle-factura.component';
import {NotfoundComponent} from './notfound/notfound.component';


const routes: Routes = [
  {path: 'reparaciones', component: ReparacionesComponent},
  {path: 'reparaciones/editar', component: EditarReparacionComponent},
  {path: 'reparaciones/nueva', component: NuevaReparacionComponent},
  {path: 'reparaciones/detalles', component: DetalleReparacionComponent},
  {path: 'facturas', component: DashboardFacturaComponent},
  {path: 'facturas/detalles', component: DetalleFacturaComponent},
  {path: 'notfound', component: NotfoundComponent},
  {path: '**', redirectTo: 'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
