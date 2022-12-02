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
  CuartoUtil,
} from '../models';
import {InmuebleRepository} from '../repositories';

@authenticate("admin")
export class InmuebleCuartoUtilController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/cuarto-util', {
    responses: {
      '200': {
        description: 'Inmueble has one CuartoUtil',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CuartoUtil),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CuartoUtil>,
  ): Promise<CuartoUtil> {
    return this.inmuebleRepository.cuartoUtil(id).get(filter);
  }

  @post('/inmuebles/{id}/cuarto-util', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(CuartoUtil)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuartoUtil, {
            title: 'NewCuartoUtilInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) cuartoUtil: Omit<CuartoUtil, 'id'>,
  ): Promise<CuartoUtil> {
    return this.inmuebleRepository.cuartoUtil(id).create(cuartoUtil);
  }

  @patch('/inmuebles/{id}/cuarto-util', {
    responses: {
      '200': {
        description: 'Inmueble.CuartoUtil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuartoUtil, {partial: true}),
        },
      },
    })
    cuartoUtil: Partial<CuartoUtil>,
    @param.query.object('where', getWhereSchemaFor(CuartoUtil)) where?: Where<CuartoUtil>,
  ): Promise<Count> {
    return this.inmuebleRepository.cuartoUtil(id).patch(cuartoUtil, where);
  }

  @del('/inmuebles/{id}/cuarto-util', {
    responses: {
      '200': {
        description: 'Inmueble.CuartoUtil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CuartoUtil)) where?: Where<CuartoUtil>,
  ): Promise<Count> {
    return this.inmuebleRepository.cuartoUtil(id).delete(where);
  }
}
