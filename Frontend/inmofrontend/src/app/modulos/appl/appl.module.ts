import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApplRoutingModule } from './appl-routing.module';
import { ParametrizacionModule } from './parametrizacion/parametrizacion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AccesosModule } from './accesos/accesos.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { ReportesModule } from './reportes/reportes.module';

import { ApplComponent } from './appl.component';
import { NavBarComponent } from './plantilla-appl/nav-bar/nav-bar.component';

// Interceptors
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';

@NgModule({
  declarations: [
  
    NavBarComponent,
    ApplComponent
  ],
  imports: [
    CommonModule,
    ApplRoutingModule,
    ParametrizacionModule,
    UsuarioModule,
    AccesosModule,
    FacturacionModule,
    ReportesModule
  ],
  providers: [
    { // Agregar Interceptors
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
})
export class ApplModule { }
