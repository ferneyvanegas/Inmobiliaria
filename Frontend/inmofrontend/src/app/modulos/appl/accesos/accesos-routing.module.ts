import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccesosComponent } from './accesos.component';
import { CrearEditarComponent } from './usuarios/crear-editar/crear-editar.component';
import { EliminarComponent } from './usuarios/eliminar/eliminar.component';

const routes: Routes = [
  {
    path: '',
    component: AccesosComponent,
    children: [
    ]
  },
  {
    path: 'crear',
    component: CrearEditarComponent
  },
  {
    path: 'editar/:id',
    component: CrearEditarComponent
  },
  {
    path: 'eliminar',
    component: EliminarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesosRoutingModule { }
