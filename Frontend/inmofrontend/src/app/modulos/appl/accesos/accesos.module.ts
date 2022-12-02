import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AccesosRoutingModule } from './accesos-routing.module';
import { AccesosComponent } from './accesos.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearEditarComponent } from './usuarios/crear-editar/crear-editar.component';
import { EliminarComponent } from './usuarios/eliminar/eliminar.component';


@NgModule({
  declarations: [
    AccesosComponent,
    RolesComponent,
    UsuariosComponent,
    CrearEditarComponent,
    EliminarComponent
  ],
  imports: [
    CommonModule,
    AccesosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccesosModule { }
