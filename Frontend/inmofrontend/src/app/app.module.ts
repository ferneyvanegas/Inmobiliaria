import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxCaptchaModule } from 'ngx-captcha';

// Módulos
import { LoginModule } from './modulos/login/login.module';
import { ApplModule } from './modulos/appl/appl.module'; 
import { LandingModule } from './modulos/landing/landing.module';
// Componentes
import { PiePaginaComponent } from './plantilla/pie-pagina/pie-pagina.component';

@NgModule({
  declarations: [
    AppComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    ApplModule,
    LandingModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
