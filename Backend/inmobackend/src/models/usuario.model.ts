import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Rol} from './rol.model';
import {RolesUsuarios} from './roles-usuarios.model';
import {Inmueble} from './inmueble.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  priNombre: string;

  @property({
    type: 'string',
  })
  segNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  priApellido: string;

  @property({
    type: 'string',
  })
  segApellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElec: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: false,
  })
  pass: string;

  @hasMany(() => Rol, {through: {model: () => RolesUsuarios}})
  roles: Rol[];

  @hasOne(() => Inmueble)
  inmueble: Inmueble;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
