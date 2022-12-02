import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const cryptoJS = require("crypto-js");
import { Subscription } from 'rxjs';

// Configuración y Modelos
import { Msn } from 'src/app/config/msn';
import { IdentificacionModel } from 'src/app/models/identificacion.model';

// Servicios
import { LoginService } from 'src/app/services/login.service';
import { GlobalService } from 'src/app/services/global.service';
import { Keys } from 'src/app/config/keys';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit,OnDestroy {
  // Flags
  sendingData:boolean;

  siteKey: string;
  suscripcion:Subscription;

  fg:FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
    recaptcha: ['', [Validators.required]]
  });

  constructor(
    private _login: LoginService,
    private _global: GlobalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.sendingData = false;
    this.suscripcion = new Subscription();
    this.siteKey = Keys.siteKeyRecaptcha;
   }

  ngOnInit(): void {
  }

  login(){
    this.sendingData = true;
    let identificacion = new IdentificacionModel();
    identificacion.usuario = this.fg.controls['usuario'].value;
    identificacion.pass = cryptoJS.MD5(this.fg.controls['pass'].value).toString();
    this.suscripcion.add(
      this._login.identificarUsuario(identificacion).subscribe({
        next:(response:any)=>{
          this.sendingData = false;
          this._login.almacenarSession(response);
          this.router.navigate(['appl/usuario']); // Redirige al interior de la app
          this._login.usuarioAutenticado.next(response);
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
    this.suscripcion.unsubscribe();
  }

}
