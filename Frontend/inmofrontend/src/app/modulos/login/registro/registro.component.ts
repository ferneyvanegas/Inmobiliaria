import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Se precisa para que cuando se cambie de componente, no se siga con las suscripciones de este, ya que provocan que la aplicanción se vuelva inestable

// Configuración y Modelos
import { Msn } from 'src/app/config/msn';
import { UsuarioModel } from 'src/app/models/usuario.model';

// Servicios
import { LoginService } from 'src/app/services/login.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, OnDestroy {
  // Flags
  sendingData:boolean;

  // Se precisa implementar la interfaz OnDestroy para así usar suscription adecuadamente
  subscription:Subscription;

  fg: FormGroup = this.fb.group({
    id : ['', []],
    priNombre : ['', [Validators.required]],
    segNombre : ['', []],
    priApellido : ['', [Validators.required]],
    segApellido : ['', []],
    documento : ['', [Validators.required]],
    correoElec : ['', [Validators.required, Validators.email]],
    celular : ['', [Validators.required]],
    pass : ['', []]
  });

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

  // Método para registrar un usuario
  registrarUsuario(){
    this.sendingData = true;

    let usuario = new UsuarioModel();
    usuario.priNombre = this.fg.controls['priNombre'].value;
    usuario.segNombre = this.fg.controls['segNombre'].value;
    usuario.priApellido = this.fg.controls['priApellido'].value;
    usuario.segApellido = this.fg.controls['segApellido'].value;
    usuario.documento = this.fg.controls['documento'].value;
    usuario.correoElec = this.fg.controls['correoElec'].value;
    usuario.celular = this.fg.controls['celular'].value;

    this.subscription.add(
      this._login.registrarUsuario(usuario).subscribe({
        next:(response:any)=>{
          this.sendingData = false;
          let msn = new Msn(
            'success',
            'Te has registrado correctamente! Hemos enviado a tu correo las credenciales de acceso.',
          );
          this._global.msnEmitter.emit(msn);
          this.router.navigate(['/']); // Redirige al login
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

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
