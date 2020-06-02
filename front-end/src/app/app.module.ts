import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { NuevaReparacionComponent } from './reparaciones/nueva-reparacion/nueva-reparacion.component';
import { DashboardReparacionComponent } from './reparaciones/dashboard-reparacion/dashboard-reparacion.component';
import { EditarReparacionComponent } from './reparaciones/editar-reparacion/editar-reparacion.component';
import { DetalleReparacionComponent } from './reparaciones/detalle-reparacion/detalle-reparacion.component';
import { ReparacionService } from './reparaciones/reparacion.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { FacturasComponent } from './facturas/facturas.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardFacturaComponent } from './facturas/dashboard-factura/dashboard-factura.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura/detalle-factura.component';
import { NuevaFacturaComponent } from './facturas/nueva-factura/nueva-factura.component';
import { EditarFacturaComponent } from './facturas/editar-factura/editar-factura.component';
import { StockComponent } from './stock/stock.component';
import { DashboardStockComponent } from './stock/dashboard-stock/dashboard-stock.component';
import { NuevoStockComponent } from './stock/nuevo-stock/nuevo-stock.component';
import { EditarStockComponent } from './stock/editar-stock/editar-stock.component';

registerLocaleData(localeEs, 'es');

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
    NotfoundComponent,
    DashboardFacturaComponent,
    DetalleFacturaComponent,
    NuevaFacturaComponent,
    EditarFacturaComponent,
    StockComponent,
    DashboardStockComponent,
    NuevoStockComponent,
    EditarStockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    ReparacionService,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
