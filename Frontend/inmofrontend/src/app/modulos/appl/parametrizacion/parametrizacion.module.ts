import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { ParametrizacionComponent } from './parametrizacion.component';
import { GeneralComponent } from './general/general.component';
import { SideNavComponent } from './side-nav/side-nav.component';


@NgModule({
  declarations: [
    ParametrizacionComponent,
    GeneralComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    ParametrizacionRoutingModule
  ]
})
export class ParametrizacionModule { }
