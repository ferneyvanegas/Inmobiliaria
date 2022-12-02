import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CambioPassModel } from '../models/cambio-pass.model';

import { Keys } from '../config/keys';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  // Método para consumir la API para actualizar la contraseña de un usuario
  cambiarPass(credenciales: CambioPassModel): Observable<boolean>{
    let url = `${Keys.urlBase}cambiarPass`;
    return this.http.post<boolean>(url,credenciales, {
      headers: new HttpHeaders({
      })
    });
  }
}
