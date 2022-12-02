import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSessionGuard } from 'src/app/guardianes/validador-session.guard';
import { ApplComponent } from './appl.component';

const routes: Routes = [
  {
    path: 'appl',
    component: ApplComponent,
    children: [
      {
        path:'param',
        loadChildren: ()=>import("./parametrizacion/parametrizacion.module").then(x => x.ParametrizacionModule)
      },
      {
        path:'usuario',
        loadChildren: ()=>import("./usuario/usuario.module").then(x => x.UsuarioModule)
      },
      {
        path:'accesos',
        loadChildren: ()=>import("./accesos/accesos.module").then(x => x.AccesosModule)
      },
      {
        path:'facturacion',
        loadChildren: ()=>import("./facturacion/facturacion.module").then(x => x.FacturacionModule)
      },
      {
        path:'reportes',
        loadChildren: ()=>import("./reportes/reportes.module").then(x => x.ReportesModule)
      },
    ],
    canActivate:[ValidadorSessionGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/appl/param' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplRoutingModule { }
