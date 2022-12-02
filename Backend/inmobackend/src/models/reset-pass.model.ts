import {Model, model, property} from '@loopback/repository';

@model()
export class ResetPass extends Model {
  @property({
    type: 'string',
    required: true,
  })
  email: string;


  constructor(data?: Partial<ResetPass>) {
    super(data);
  }
}

export interface ResetPassRelations {
  // describe navigational properties here
}

export type ResetPassWithRelations = ResetPass & ResetPassRelations;
