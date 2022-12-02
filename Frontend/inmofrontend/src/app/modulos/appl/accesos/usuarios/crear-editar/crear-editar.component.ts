import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs'; // Se precisa para que cuando se cambie de componente, no se siga con las suscripciones de este, ya que provocan que la aplicanción se vuelva inestable

// Configuración y Modelos
import { Msn } from 'src/app/config/msn';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { RolModel } from 'src/app/models/rol.model';

// Servicios
import { LoginService } from 'src/app/services/login.service';
import { GlobalService } from 'src/app/services/global.service';
import { AccesosService } from 'src/app/services/accesos.service';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: ['./crear-editar.component.css']
})
export class CrearEditarComponent implements OnInit, OnDestroy {

  roles: any;
  subscription:Subscription;

  // Flags
  sendingData:boolean;
  editMode: boolean;

  usuarioParaEdicion: UsuarioModel;

  fg: FormGroup = this.fb.group({
    id : ['', []],
    priNombre : ['', [Validators.required]],
    segNombre : ['', []],
    priApellido : ['', [Validators.required]],
    segApellido : ['', []],
    documento : ['', [Validators.required]],
    correoElec : ['', [Validators.required, Validators.email]],
    celular : ['', [Validators.required]],
    pass: ['',[]],
    rol : ['', [Validators.required]]
  });

  constructor(
    private _login: LoginService,
    private _global: GlobalService,
    private _accesos: AccesosService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { 
      this.subscription = new Subscription;
      this.sendingData = false;
      this.editMode = false;
      this.usuarioParaEdicion = new UsuarioModel();
    }

  ngOnInit(): void {
    this.obtenerRoles();

    this.subscription.add(
      this.route.params.subscribe((params:any)=>{
        if(params.id){
          this.editMode = true;
          this.obtenerUsuarioParaEdicion(params.id);
        }
        else{
          this.editMode = false;
        }
      })
    );
  }

  // Método para obterner roles
  obtenerRoles(){
    this.subscription.add(
      this._accesos.obtenerRoles().subscribe({
        next:(response:RolModel[])=>{
          this.roles = response;
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

  // Método para editar un usuario
  selectAction(){
    this.sendingData = true;
    if(this.editMode){
      this.editarUsuario();
    }
    else{
      this.crearUsuario();
    }
  }

  // Método para crear un usuario
  crearUsuario(){
    let usuario = this.prepararUsuario();

    this.subscription.add(
      this._accesos.crearUsuario(usuario).subscribe({
        next:(response:any)=>{
          this.sendingData = false;
          let msn = new Msn(
            'success',
            'Se registró un nuevo usuario',
          );
          this._global.msnEmitter.emit(msn);
          this.router.navigate(['/appl/accesos']); 
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

  // Método para editar un usuario
  editarUsuario(){
    let usuario = this.prepararUsuario();
    usuario.id = this.fg.controls['id'].value;

    this.subscription.add(
      this._accesos.editarUsuario(usuario).subscribe({
        next:(response:any)=>{
          this.sendingData = false;
          this.router.navigate(['/appl/accesos']); 
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

  // Método para preparar un usuario (con los datos del formulario) que será creado/editado
  prepararUsuario(): UsuarioModel{
    let usuario = new UsuarioModel();
    usuario.priNombre = this.fg.controls['priNombre'].value;
    usuario.segNombre = this.fg.controls['segNombre'].value;
    usuario.priApellido = this.fg.controls['priApellido'].value;
    usuario.segApellido = this.fg.controls['segApellido'].value;
    usuario.documento = this.fg.controls['documento'].value;
    usuario.correoElec = this.fg.controls['correoElec'].value;
    usuario.celular = this.fg.controls['celular'].value;
    usuario.rolId = this.fg.controls['rol'].value; 
    return usuario; 
  }

  // Método para obtener un usuario para ser editado
  obtenerUsuarioParaEdicion(usuarioId:string){
    this.subscription.add(
      this._accesos.obtenerUsuario(usuarioId).subscribe({
        next:(response:UsuarioModel)=>{
          this.fg.patchValue({
            id : response.id,
            priNombre : response.priNombre,
            segNombre : response.segNombre,
            priApellido : response.priApellido,
            segApellido : response.segApellido,
            documento : response.documento,
            correoElec : response.correoElec,
            celular : response.celular,
            rol: response.roles?response.roles[0].id:''
          });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
