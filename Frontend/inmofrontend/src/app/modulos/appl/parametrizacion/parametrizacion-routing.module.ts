import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametrizacionComponent } from './parametrizacion.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {
    path: '',
    component: ParametrizacionComponent,
    children: [
      {
        path: 'general',
        component: GeneralComponent
      }
    ],
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { } 
