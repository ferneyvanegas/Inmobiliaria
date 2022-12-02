import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

// Modelos y Configuración
import { Msn } from 'src/app/config/msn';
import { UsuarioModel } from 'src/app/models/usuario.model';

// Servicios
import { GlobalService } from 'src/app/services/global.service';
import { AccesosService } from 'src/app/services/accesos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios: any;

  subscription: Subscription;

  constructor(
    private _global: GlobalService,
    private _accesos: AccesosService,
    private router: Router
    ) { 
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Método para obtener los usuarios
  obtenerUsuarios(){
    this.subscription.add(
      this._accesos.obtenerUsuarios().subscribe({
        next:(response:UsuarioModel[])=>{
          this.usuarios = response;
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

  // Seleccionar usuario para eliminar
  seleccionarUsuario(usuario:UsuarioModel){
    // Por razones del destino, tuve que agregar un timeOut para que esperara un poco y luego sí emitiera el usuario
    setTimeout(() => {
      this._accesos.usuarioEmmiter.emit(usuario);
    }, 500);
    this.router.navigate(['/appl/accesos/eliminar']);
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
