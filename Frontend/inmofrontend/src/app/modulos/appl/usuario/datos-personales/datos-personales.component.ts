import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtHelperService} from '@auth0/angular-jwt'; // Para decodificar en token

import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioAutenticadoModel } from 'src/app/models/usuario-autenticado.model';
// Servicios
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  subscripcion: Subscription;
  usuario: UsuarioModel;

  helper = new JwtHelperService();

  constructor(
    private _login: LoginService
  ) { 
    this.usuario = new UsuarioModel();
    this.subscripcion = new Subscription;
  }

  ngOnInit(): void {
    this.subscripcion = this._login.usuarioAutenticado.subscribe((data:UsuarioAutenticadoModel)=>{
      try{
        this.usuario = (this.helper.decodeToken(data.tk).data);      
      }
      catch (e){}   
    });
  }

}
