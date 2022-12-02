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
import {CuartoUtil} from '../models';
import {CuartoUtilRepository} from '../repositories';

@authenticate("admin")
export class CuartoUtilController {
  constructor(
    @repository(CuartoUtilRepository)
    public cuartoUtilRepository : CuartoUtilRepository,
  ) {}

  @post('/cuartos')
  @response(200, {
    description: 'CuartoUtil model instance',
    content: {'application/json': {schema: getModelSchemaRef(CuartoUtil)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuartoUtil, {
            title: 'NewCuartoUtil',
            exclude: ['id'],
          }),
        },
      },
    })
    cuartoUtil: Omit<CuartoUtil, 'id'>,
  ): Promise<CuartoUtil> {
    return this.cuartoUtilRepository.create(cuartoUtil);
  }

  @get('/cuartos/count')
  @response(200, {
    description: 'CuartoUtil model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CuartoUtil) where?: Where<CuartoUtil>,
  ): Promise<Count> {
    return this.cuartoUtilRepository.count(where);
  }

  @get('/cuartos')
  @response(200, {
    description: 'Array of CuartoUtil model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CuartoUtil, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CuartoUtil) filter?: Filter<CuartoUtil>,
  ): Promise<CuartoUtil[]> {
    return this.cuartoUtilRepository.find(filter);
  }

  @patch('/cuartos')
  @response(200, {
    description: 'CuartoUtil PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuartoUtil, {partial: true}),
        },
      },
    })
    cuartoUtil: CuartoUtil,
    @param.where(CuartoUtil) where?: Where<CuartoUtil>,
  ): Promise<Count> {
    return this.cuartoUtilRepository.updateAll(cuartoUtil, where);
  }

  @get('/cuartos/{id}')
  @response(200, {
    description: 'CuartoUtil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CuartoUtil, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CuartoUtil, {exclude: 'where'}) filter?: FilterExcludingWhere<CuartoUtil>
  ): Promise<CuartoUtil> {
    return this.cuartoUtilRepository.findById(id, filter);
  }

  @patch('/cuartos/{id}')
  @response(204, {
    description: 'CuartoUtil PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuartoUtil, {partial: true}),
        },
      },
    })
    cuartoUtil: CuartoUtil,
  ): Promise<void> {
    await this.cuartoUtilRepository.updateById(id, cuartoUtil);
  }

  @put('/cuartos/{id}')
  @response(204, {
    description: 'CuartoUtil PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cuartoUtil: CuartoUtil,
  ): Promise<void> {
    await this.cuartoUtilRepository.replaceById(id, cuartoUtil);
  }

  @del('/cuartos/{id}')
  @response(204, {
    description: 'CuartoUtil DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cuartoUtilRepository.deleteById(id);
  }
}
