import {Entity, model, property} from '@loopback/repository';

@model()
export class RolesUsuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @property({
    type: 'string',
  })
  rolId?: string;

  constructor(data?: Partial<RolesUsuarios>) {
    super(data);
  }
}

export interface RolesUsuariosRelations {
  // describe navigational properties here
}

export type RolesUsuariosWithRelations = RolesUsuarios & RolesUsuariosRelations;
