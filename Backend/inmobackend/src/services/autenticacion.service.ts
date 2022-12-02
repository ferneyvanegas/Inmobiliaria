import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Inmueble, RolesUsuarios, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import {Keys} from '../config/keys';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
    ) {}

  // Método para generar la clave
  generarPass(){
    let password = generador(8, false);
    return password;
  }

  // Método para encriptar la clave
  cifrarPass(password:string){
    let passCifrada = cryptoJS.MD5(password).toString();
    return passCifrada;
  }

  // Método para identificar usuarios
  identificarUsuario(usuario: string, password: string){
    try {
      let p = this.usuarioRepository.findOne({where: {correoElec: usuario , pass:password},
      include :["roles"]
      });
      
      if(p){
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Metodo para generar Tokens
  generarTokenJWT(usuario: Usuario ){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        priNombre: usuario.priNombre,
        segNombre: usuario.segNombre,
        priApellido: usuario.priApellido,
        segApellido: usuario.segApellido,
        documento: usuario.documento,
        correoElec: usuario.correoElec,
        celular: usuario.celular,
        roles: usuario.roles
      }
    },
      Keys.claveJWT);
    return token;
  }

  // Validacion de Token JWT
  validarTokenJWT(token:string){
    try{
      let datos = jwt.verify(token, Keys.claveJWT)
      return datos;
    }catch{
      return false;
    }
  }
}
