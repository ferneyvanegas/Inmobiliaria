import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inmueble,
  Parqueadero,
} from '../models';
import {InmuebleRepository} from '../repositories';

@authenticate("admin")
export class InmuebleParqueaderoController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Inmueble has one Parqueadero',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Parqueadero),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parqueadero>,
  ): Promise<Parqueadero> {
    return this.inmuebleRepository.parqueadero(id).get(filter);
  }

  @post('/inmuebles/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {
            title: 'NewParqueaderoInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) parqueadero: Omit<Parqueadero, 'id'>,
  ): Promise<Parqueadero> {
    return this.inmuebleRepository.parqueadero(id).create(parqueadero);
  }

  @patch('/inmuebles/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Inmueble.Parqueadero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {partial: true}),
        },
      },
    })
    parqueadero: Partial<Parqueadero>,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.inmuebleRepository.parqueadero(id).patch(parqueadero, where);
  }

  @del('/inmuebles/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Inmueble.Parqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.inmuebleRepository.parqueadero(id).delete(where);
  }
}
