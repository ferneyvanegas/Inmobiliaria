import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=>import("./modulos/login/login.module").then(x=>x.LoginModule)
  },
  {
    path: 'appl',
    loadChildren: ()=>import("./modulos/appl/appl.module").then(x=>x.ApplModule)    
  },
  {
    path: 'landing',
    loadChildren: ()=>import("./modulos/landing/landing.module").then(x=>x.LandingModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login/acceso' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
