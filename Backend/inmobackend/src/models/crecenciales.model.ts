import {Model, model, property} from '@loopback/repository';

@model()
export class Crecenciales extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  pass: string;


  constructor(data?: Partial<Crecenciales>) {
    super(data);
  }
}

export interface CrecencialesRelations {
  // describe navigational properties here
}

export type CrecencialesWithRelations = Crecenciales & CrecencialesRelations;
