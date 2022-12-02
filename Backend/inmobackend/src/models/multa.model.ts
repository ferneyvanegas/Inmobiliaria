import {Entity, model, property} from '@loopback/repository';

@model()
export class Multa extends Entity {
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
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  constructor(data?: Partial<Multa>) {
    super(data);
  }
}

export interface MultaRelations {
  // describe navigational properties here
}

export type MultaWithRelations = Multa & MultaRelations;
