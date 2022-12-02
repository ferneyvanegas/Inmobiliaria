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
import {Multa} from '../models';
import {MultaRepository} from '../repositories';

@authenticate("admin")
export class MultaController {
  constructor(
    @repository(MultaRepository)
    public multaRepository : MultaRepository,
  ) {}

  @post('/multas')
  @response(200, {
    description: 'Multa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Multa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {
            title: 'NewMulta',
            exclude: ['id'],
          }),
        },
      },
    })
    multa: Omit<Multa, 'id'>,
  ): Promise<Multa> {
    return this.multaRepository.create(multa);
  }

  @get('/multas/count')
  @response(200, {
    description: 'Multa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Multa) where?: Where<Multa>,
  ): Promise<Count> {
    return this.multaRepository.count(where);
  }

  @get('/multas')
  @response(200, {
    description: 'Array of Multa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Multa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Multa) filter?: Filter<Multa>,
  ): Promise<Multa[]> {
    return this.multaRepository.find(filter);
  }

  @patch('/multas')
  @response(200, {
    description: 'Multa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {partial: true}),
        },
      },
    })
    multa: Multa,
    @param.where(Multa) where?: Where<Multa>,
  ): Promise<Count> {
    return this.multaRepository.updateAll(multa, where);
  }

  @get('/multas/{id}')
  @response(200, {
    description: 'Multa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Multa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Multa, {exclude: 'where'}) filter?: FilterExcludingWhere<Multa>
  ): Promise<Multa> {
    return this.multaRepository.findById(id, filter);
  }

  @patch('/multas/{id}')
  @response(204, {
    description: 'Multa PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {partial: true}),
        },
      },
    })
    multa: Multa,
  ): Promise<void> {
    await this.multaRepository.updateById(id, multa);
  }

  @put('/multas/{id}')
  @response(204, {
    description: 'Multa PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() multa: Multa,
  ): Promise<void> {
    await this.multaRepository.replaceById(id, multa);
  }

  @del('/multas/{id}')
  @response(204, {
    description: 'Multa DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.multaRepository.deleteById(id);
  }
}
