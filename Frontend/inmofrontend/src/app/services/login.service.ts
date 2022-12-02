import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';
import { ResetPassModel } from '../models/reset-pass.model';
import { IdentificacionModel } from '../models/identificacion.model';
import { UsuarioAutenticadoModel } from '../models/usuario-autenticado.model';

import { Keys } from '../config/keys';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuarioAutenticado = new BehaviorSubject<UsuarioAutenticadoModel>(new UsuarioAutenticadoModel());

  constructor(private http:HttpClient) { 
    this.verificarUsuario();
  }

  // Método para consumir la API identificación de usuarios en el backend
  identificarUsuario(identificacion: IdentificacionModel): Observable<UsuarioAutenticadoModel>{
    let url = `${Keys.urlBase}identificarUsuario`;
    return this.http.post<UsuarioAutenticadoModel>(url,identificacion, {
      headers: new HttpHeaders({
      })
    });
  }

  // Método para identificar si un usuario ya está logueado
  verificarUsuario(){
    let usuario = this.obtenerSession();
    if(usuario){
      this.usuarioAutenticado.next(usuario);
    }
  }

  // Método para almacenar la session en el localStorage
  almacenarSession(usuario: UsuarioAutenticadoModel){
    let stringUsuario = JSON.stringify(usuario);
    localStorage.setItem('datosSession', stringUsuario)
  }

  // Método para obtener los datos de un usuario logueado
  obtenerSession(){
    let stringUsuario = localStorage.getItem('datosSession');
    if(stringUsuario)
      return JSON.parse(stringUsuario);
    else
      return null;
  }

  // Método para cerrar la sessión de usuario
  cerrarSession(){
    localStorage.removeItem('datosSession');
    localStorage.clear();
  }

  // Método para consumir la API de creación de usuarios del backend
  registrarUsuario(usuario: UsuarioModel): Observable<UsuarioModel>{
    let url = `${Keys.urlBase}usuarios`;
    return this.http.post<UsuarioModel>(url,usuario, {
      headers: new HttpHeaders({
      })
    });
  }

  // Metodo para recuperar clave con el correo electronico
  recuperarPass(resetPassData: ResetPassModel): Observable<boolean>{
    let url = `${Keys.urlBase}recuperarPass`;
    return this.http.post<boolean>(url,resetPassData, {
      headers: new HttpHeaders({
      })
    });
  }

  obtenerMenu(): Observable<any[]>{
    let url = `${Keys.urlBase}obtenerMenu`;
    return this.http.get<any[]>(url, {
      headers: new HttpHeaders({
      })
    });
  }
}
