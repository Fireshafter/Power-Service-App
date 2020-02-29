import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { EditarReparacionComponent } from './reparaciones/editar-reparacion/editar-reparacion.component';
import { NuevaReparacionComponent } from './reparaciones/nueva-reparacion/nueva-reparacion.component';
import { DetalleReparacionComponent } from './reparaciones/detalle-reparacion/detalle-reparacion.component';


const routes: Routes = [
  //{path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'reparaciones', component: ReparacionesComponent},
  {path: 'reparaciones/editar', component: EditarReparacionComponent},
  {path: 'reparaciones/nueva', component: NuevaReparacionComponent},
  {path: 'reparaciones/detalles', component: DetalleReparacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
