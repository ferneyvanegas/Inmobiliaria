import {Entity, model, property} from '@loopback/repository';

@model()
export class CuartoUtil extends Entity {
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
  area: string;

  @property({
    type: 'string',
    required: true,
  })
  inmuebleAsociado: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  constructor(data?: Partial<CuartoUtil>) {
    super(data);
  }
}

export interface CuartoUtilRelations {
  // describe navigational properties here
}

export type CuartoUtilWithRelations = CuartoUtil & CuartoUtilRelations;
