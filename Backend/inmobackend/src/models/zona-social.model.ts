import {Entity, model, property} from '@loopback/repository';

@model()
export class ZonaSocial extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  foto?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  costoAlquiler: number;

  @property({
    type: 'string',
    default: 'Sin horario definido',
  })
  horarioAcceso?: string;

  @property({
    type: 'string',
  })
  conjuntoId?: string;

  constructor(data?: Partial<ZonaSocial>) {
    super(data);
  }
}

export interface ZonaSocialRelations {
  // describe navigational properties here
}

export type ZonaSocialWithRelations = ZonaSocial & ZonaSocialRelations;
