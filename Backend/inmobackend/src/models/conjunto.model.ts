import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Torre} from './torre.model';
import {ZonaSocial} from './zona-social.model';

@model()
export class Conjunto extends Entity {
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
  nomConjunto: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  cuentaBanco: string;

  @property({
    type: 'string',
    required: true,
  })
  banco: string;

  @property({
    type: 'string',
    required: true,
  })
  administrador: string;

  @property({
    type: 'number',
    default: 0,
  })
  interesMora?: number;

  @property({
    type: 'number',
    default: 0,
  })
  inicioNumFact?: number;

  @property({
    type: 'number',
    default: 0,
  })
  presupuestoActual?: number;

  @hasMany(() => Inmueble)
  inmuebles?: Inmueble[];

  @hasMany(() => Torre)
  torres?: Torre[];

  @hasMany(() => ZonaSocial)
  zonasSociales?: ZonaSocial[];

  constructor(data?: Partial<Conjunto>) {
    super(data);
  }
}

export interface ConjuntoRelations {
  // describe navigational properties here
}

export type ConjuntoWithRelations = Conjunto & ConjuntoRelations;
