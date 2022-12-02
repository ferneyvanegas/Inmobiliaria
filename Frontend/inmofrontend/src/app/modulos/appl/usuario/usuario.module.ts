import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { CambiarPassComponent } from './cambiar-pass/cambiar-pass.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    CambiarPassComponent,
    DatosPersonalesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
