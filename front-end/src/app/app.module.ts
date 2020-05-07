import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { NuevaReparacionComponent } from './reparaciones/nueva-reparacion/nueva-reparacion.component';
import { DashboardReparacionComponent } from './reparaciones/dashboard-reparacion/dashboard-reparacion.component';
import { EditarReparacionComponent } from './reparaciones/editar-reparacion/editar-reparacion.component';
import { DetalleReparacionComponent } from './reparaciones/detalle-reparacion/detalle-reparacion.component';
import { ReparacionService } from './reparaciones/reparacion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { FacturasComponent } from './facturas/facturas.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    ReparacionesComponent,
    NuevaReparacionComponent,
    DashboardReparacionComponent,
    EditarReparacionComponent,
    DetalleReparacionComponent,
    NavbarComponent,
    FacturasComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ReparacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
