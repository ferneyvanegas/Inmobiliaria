import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const cryptoJS = require("crypto-js");
import { Subscription } from 'rxjs';

import { CambioPassModel } from 'src/app/models/cambio-pass.model';
import { Msn } from 'src/app/config/msn';

import { UsuarioService } from 'src/app/services/usuario.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit, OnDestroy {

  fg: FormGroup = this.fb.group({
    actual : ['',[Validators.required, Validators.minLength(8)]],
    nueva : ['',[Validators.required, Validators.minLength(8)]],
    revalidar : ['',[Validators.required, Validators.minLength(8)]]
  });
  subscripcion: Subscription;
  
  constructor(
    private fb:FormBuilder,
    private _usuario: UsuarioService,
    private _global: GlobalService
    ) { 
    this.subscripcion = new Subscription();
  }

  ngOnInit(): void {
  }

  // Método para cambiar la contraseña
  cambiarPass(){
    let cambio = new CambioPassModel();
    cambio.actual = cryptoJS.MD5(this.fg.controls['actual'].value).toString();
    cambio.nueva = this.fg.controls['nueva'].value;
    cambio.revalidar = this.fg.controls['revalidar'].value;
    
    this.subscripcion.add(
      this._usuario.cambiarPass(cambio).subscribe(({
        next:(response:boolean)=>{
          if(response){
            // Limpiar el formulario
            this.fg.patchValue({
              actual : '',
              nueva : '',
              revalidar : ''
            });

            let msn = new Msn(
              'success',
              'Actualizaste tu contraseña con éxito!',
            );
            this._global.msnEmitter.emit(msn);
          }
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
      }))
    );
  }

  // Método que verifica si la contraseña nueva y la revalidada son iguales (debe ser público para que se pueda usar en el Html)
  public compararPass(){
    if(this.fg.controls['nueva'].value == this.fg.controls['revalidar'].value)
      return true;
    else
      return false;
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

}
