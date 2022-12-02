import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Configuración y Modelos
import { Msn } from 'src/app/config/msn';
import { ResetPassModel } from 'src/app/models/reset-pass.model';
// Servicios
import { LoginService } from 'src/app/services/login.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit, OnDestroy {
  // Flags
  sendingData:boolean;

  subscription:Subscription;

  fg: FormGroup = this.fb.group({
    correoElec : ['', [Validators.required, Validators.email]],
  })

  constructor(
    private _login: LoginService,
    private _global: GlobalService,
    private fb: FormBuilder,
    private router: Router
    ) { 
      this.sendingData = false;
      this.subscription = new Subscription;
    }

  ngOnInit(): void {
  }

  // Método para recuperar contraseña
  recuperarPass(){
    this.sendingData = true;
    let resetPassData = new ResetPassModel();
    resetPassData.email = this.fg.controls['correoElec'].value;

    this._login.recuperarPass(resetPassData).subscribe({
      next:(response:any)=>{
        this.sendingData = false;
        let msn = new Msn(
          'success',
          'Hemos enviado a tu correo las credenciales de acceso.',
        );
        this._global.msnEmitter.emit(msn);
        this.router.navigate(['/']); // Redirige al login
      },
      error:(error:any)=>{
        this.sendingData = false;
        // Se limpia el formulario
        this.fg.patchValue({
          correoElec: ''
        });

        // Notificación al usuario
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
      });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
