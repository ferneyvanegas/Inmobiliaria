import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Módelos
import { UsuarioAutenticadoModel } from 'src/app/models/usuario-autenticado.model';
// Servicios
import { LoginService } from '../services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  //Este interceptor fue agregado también a la matriz de 'Providers' en el app.module
  constructor(private _login: LoginService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let usuarioAutenticado:UsuarioAutenticadoModel = this._login.obtenerSession();

    if(usuarioAutenticado != null){
      const token:any = usuarioAutenticado.tk;
    
      // Si el token existe, entonces se modifica la cabecera
      if(token){
        req = req.clone({
          setHeaders:{
            authorization: `Bearer ${token}`
          }
        });
      }
      else{ // Si no existe el token, se retira la cabecera
        req = req.clone({
          setHeaders:{
          }
        });
      }
    }
    else{ // Si no se recupera la session, se retira la cabecera
      req = req.clone({
        setHeaders:{
        }
      });
    }

    return next.handle(req);
  }
}
