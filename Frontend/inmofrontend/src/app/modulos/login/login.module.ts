import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxCaptchaModule } from 'ngx-captcha';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NavBarLoginComponent } from './nav-bar-login/nav-bar-login.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { AccesoComponent } from './acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    LoginComponent,
    NavBarLoginComponent,
    RecuperarClaveComponent,
    AccesoComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class LoginModule { }
