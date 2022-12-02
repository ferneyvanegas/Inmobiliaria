import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

// Modelos y Configuración
import { Msn } from 'src/app/config/msn';
import { RolModel } from 'src/app/models/rol.model';

// Servicios
import { GlobalService } from 'src/app/services/global.service';
import { AccesosService } from 'src/app/services/accesos.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit, OnDestroy {

  roles: any;

  subscription: Subscription;

  constructor(
    private _global: GlobalService,
    private _accesos: AccesosService
    ) { 
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(){
    this.subscription.add(
      this._accesos.obtenerRoles().subscribe({
        next:(response:RolModel[])=>{
          this.roles = response;
        },
        error:(error:any)=>{
          let msnContent = '';
          if(error.statusText != "Unknown Error")
            msnContent = error.error.error.message;
          else
            msnContent = 'Error en el servidor. Por favor intenta más tarde'
          let msn = new Msn(
            'error',
            msnContent,
          );
          this._global.msnEmitter.emit(msn);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
