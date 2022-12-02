import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {CuartoUtil} from './cuarto-util.model';
import {Parqueadero} from './parqueadero.model';
import {Multa} from './multa.model';

@model()
export class Inmueble extends Entity {
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
  propietario: string;

  @property({
    type: 'string',
  })
  habitante?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoInmueble: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  @hasOne(() => CuartoUtil)
  cuartoUtil: CuartoUtil;

  @hasOne(() => Parqueadero)
  parqueadero: Parqueadero;

  @hasMany(() => Multa)
  multas: Multa[];

  @property({
    type: 'string',
  })
  conjuntoId?: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
