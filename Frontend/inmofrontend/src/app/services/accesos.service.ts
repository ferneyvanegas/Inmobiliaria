import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Keys } from '../config/keys';
import { RolModel } from '../models/rol.model';
import { UsuarioModel } from '../models/usuario.model';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccesosService {

  usuarioEmmiter = new EventEmitter<any>();// Se usa para entregar datos de un usuario para eliminar

  constructor(private http: HttpClient) { }

  // Método para consumir la API de consulta de roles
  obtenerRoles(): Observable<RolModel[]>{
    let url = `${Keys.urlBase}roles`;
    return this.http.get<RolModel[]>(url, {
      headers: new HttpHeaders({
      })
    });
  }

  // Método para consumir la API de consulta de varios usuarios
  obtenerUsuarios(): Observable<UsuarioModel[]>{
    let url = `${Keys.urlBase}usuarios`;
    return this.http.get<UsuarioModel[]>(url, {
      headers: new HttpHeaders({
      })
    });
  }

  // Método para consumir la API de consulta de un usuario
  obtenerUsuario(usuarioId: string): Observable<UsuarioModel>{
    let url = `${Keys.urlBase}usuarios/${usuarioId}`;
    return this.http.get<UsuarioModel>(url, {
      headers: new HttpHeaders({
      })
    });
  }

  // Método para consumir la API de crear usuarios
  crearUsuario(usuario: UsuarioModel): Observable<UsuarioModel[]>{
    let url = `${Keys.urlBase}crearUsuario`;
    return this.http.post<UsuarioModel[]>(url, usuario, {
      headers: new HttpHeaders({
      })
    });
  }

  // Método para consumir la API de eliminar usuarios
  eliminarUsuario(usuarioId: string): Observable<boolean[]>{
    let url = `${Keys.urlBase}usuarios/${usuarioId}`;
    return this.http.delete<boolean[]>(url, {
      headers: new HttpHeaders({
      })
    });
  }

  // Método para consumir la API de editar usuarios
  editarUsuario(usuario: UsuarioModel): Observable<UsuarioModel[]>{
    let url = `${Keys.urlBase}usuarios/${usuario.id}`;
    return this.http.put<UsuarioModel[]>(url, usuario, {
      headers: new HttpHeaders({
      })
    });
  }
}
