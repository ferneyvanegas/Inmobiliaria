import {Model, model, property} from '@loopback/repository';

@model()
export class CambioPass extends Model {
  @property({
    type: 'string',
    required: true,
  })
  actual: string;

  @property({
    type: 'string',
    required: true,
  })
  nueva: string;

  @property({
    type: 'string',
    required: true,
  })
  revalidar: string;


  constructor(data?: Partial<CambioPass>) {
    super(data);
  }
}

export interface CambioPassRelations {
  // describe navigational properties here
}

export type CambioPassWithRelations = CambioPass & CambioPassRelations;
