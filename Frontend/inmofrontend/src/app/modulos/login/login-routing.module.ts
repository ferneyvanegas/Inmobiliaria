import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { LoginComponent } from './login.component';
import { AccesoComponent } from './acceso/acceso.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
    children: [
      {
        path: 'acceso',
        component: AccesoComponent
      },
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path:'recuperar-clave',
        component:RecuperarClaveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
