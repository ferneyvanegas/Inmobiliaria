import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

// Modelos y Configuración
import { Msn } from 'src/app/config/msn';
import { UsuarioModel } from 'src/app/models/usuario.model';

// Servicios
import { AccesosService } from 'src/app/services/accesos.service';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit, OnDestroy {
  // Flags
  sendingData:boolean;

  subscription:Subscription;
  usuario: UsuarioModel;

  constructor(
    private _global: GlobalService,
    private _accesos: AccesosService,
    private router: Router
  ) { 
    this.sendingData = false;
    this.subscription = new Subscription();
    this. usuario = new UsuarioModel();
  }

  ngOnInit(): void {
    this.subscription.add(
      this._accesos.usuarioEmmiter.subscribe((data:any)=>{
        this.usuario = data;
      })
    );
  }

  // Método para eliminar un usuario
  eliminarUsuario(){
    this.sendingData = true;
    this.subscription.add(
      this._accesos.eliminarUsuario(this.usuario.id?this.usuario.id:'').subscribe({
        next:(response:any)=>{
          this.sendingData = false;
          this.router.navigate(['/appl/accesos']);
        },
        error:(error:any)=>{
          this.sendingData = false;
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
