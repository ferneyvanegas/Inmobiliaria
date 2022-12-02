import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Parqueadero} from '../models';
import {ParqueaderoRepository} from '../repositories';

@authenticate("admin")
export class ParqueaderoController {
  constructor(
    @repository(ParqueaderoRepository)
    public parqueaderoRepository : ParqueaderoRepository,
  ) {}

  @post('/parqueaderos')
  @response(200, {
    description: 'Parqueadero model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parqueadero)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {
            title: 'NewParqueadero',
            exclude: ['id'],
          }),
        },
      },
    })
    parqueadero: Omit<Parqueadero, 'id'>,
  ): Promise<Parqueadero> {
    return this.parqueaderoRepository.create(parqueadero);
  }

  @get('/parqueaderos/count')
  @response(200, {
    description: 'Parqueadero model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parqueadero) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.parqueaderoRepository.count(where);
  }

  @get('/parqueaderos')
  @response(200, {
    description: 'Array of Parqueadero model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parqueadero, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parqueadero) filter?: Filter<Parqueadero>,
  ): Promise<Parqueadero[]> {
    return this.parqueaderoRepository.find(filter);
  }

  @patch('/parqueaderos')
  @response(200, {
    description: 'Parqueadero PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {partial: true}),
        },
      },
    })
    parqueadero: Parqueadero,
    @param.where(Parqueadero) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.parqueaderoRepository.updateAll(parqueadero, where);
  }

  @get('/parqueaderos/{id}')
  @response(200, {
    description: 'Parqueadero model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parqueadero, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Parqueadero, {exclude: 'where'}) filter?: FilterExcludingWhere<Parqueadero>
  ): Promise<Parqueadero> {
    return this.parqueaderoRepository.findById(id, filter);
  }

  @patch('/parqueaderos/{id}')
  @response(204, {
    description: 'Parqueadero PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {partial: true}),
        },
      },
    })
    parqueadero: Parqueadero,
  ): Promise<void> {
    await this.parqueaderoRepository.updateById(id, parqueadero);
  }

  @put('/parqueaderos/{id}')
  @response(204, {
    description: 'Parqueadero PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parqueadero: Parqueadero,
  ): Promise<void> {
    await this.parqueaderoRepository.replaceById(id, parqueadero);
  }

  @del('/parqueaderos/{id}')
  @response(204, {
    description: 'Parqueadero DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parqueaderoRepository.deleteById(id);
  }
}
