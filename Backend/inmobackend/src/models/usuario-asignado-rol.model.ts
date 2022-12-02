import {Model, model, property} from '@loopback/repository';

@model()
export class UsuarioAsignadoRol extends Model {
  @property({
    type: 'string',
    id: true,
    required: false,
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
    required: true,
  })
  rolId: string;


  constructor(data?: Partial<UsuarioAsignadoRol>) {
    super(data);
  }
}

export interface UsuarioAsignadoRolRelations {
  // describe navigational properties here
}

export type UsuarioAsignadoRolWithRelations = UsuarioAsignadoRol & UsuarioAsignadoRolRelations;
