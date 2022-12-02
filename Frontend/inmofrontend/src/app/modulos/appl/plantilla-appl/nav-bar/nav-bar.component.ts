import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt'; // Para decodificar en token

// Configuración y Modelos
import { Msn } from 'src/app/config/msn';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioAutenticadoModel } from 'src/app/models/usuario-autenticado.model';
// Servicios
import { LoginService } from 'src/app/services/login.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;
  usuario: UsuarioModel;
  menu: any[];

  helper = new JwtHelperService();

  constructor(
    private router: Router,
    private _global: GlobalService,
    private _login: LoginService
  ) { 
    this.usuario = new UsuarioModel();
    this.subscripcion = new Subscription;
    this.menu = [];
  }

  ngOnInit(): void {

    this.subscripcion = this._login.usuarioAutenticado.subscribe((data:UsuarioAutenticadoModel)=>{
      try{
        this.usuario = (this.helper.decodeToken(data.tk).data);      
        this.obtenerMenu();
      }
      catch (e){}
    });

  }

  // Método para obtener los menús a los que tienes acceso para navegación. Los proporciona el backend
  obtenerMenu(){
    this.subscripcion.add(
      this._login.obtenerMenu().subscribe({
        next:(response:any[])=>{
          this.menu = response;
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

  // Método para darle click al botón de la barra y contraerla. Útil en modo móvil
  collapseNavBar(){
    (<HTMLButtonElement>document.getElementById('buttonCollapseNavBar')).click();
  }

  // Método para cerrar session
  cerrarSession(){
    this._login.cerrarSession();
    let u = new UsuarioAutenticadoModel();
    u.tk = '';
    this._login.usuarioAutenticado.next(u);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
