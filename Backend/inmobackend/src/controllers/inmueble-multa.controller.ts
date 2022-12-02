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
  Multa,
} from '../models';
import {InmuebleRepository} from '../repositories';

@authenticate("admin")
export class InmuebleMultaController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/multas', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many Multa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Multa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Multa>,
  ): Promise<Multa[]> {
    return this.inmuebleRepository.multas(id).find(filter);
  }

  @post('/inmuebles/{id}/multas', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Multa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {
            title: 'NewMultaInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) multa: Omit<Multa, 'id'>,
  ): Promise<Multa> {
    return this.inmuebleRepository.multas(id).create(multa);
  }

  @patch('/inmuebles/{id}/multas', {
    responses: {
      '200': {
        description: 'Inmueble.Multa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {partial: true}),
        },
      },
    })
    multa: Partial<Multa>,
    @param.query.object('where', getWhereSchemaFor(Multa)) where?: Where<Multa>,
  ): Promise<Count> {
    return this.inmuebleRepository.multas(id).patch(multa, where);
  }

  @del('/inmuebles/{id}/multas', {
    responses: {
      '200': {
        description: 'Inmueble.Multa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Multa)) where?: Where<Multa>,
  ): Promise<Count> {
    return this.inmuebleRepository.multas(id).delete(where);
  }
}
