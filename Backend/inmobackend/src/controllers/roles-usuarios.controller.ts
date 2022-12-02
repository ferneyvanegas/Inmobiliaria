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
import {RolesUsuarios} from '../models';
import {RolesUsuariosRepository} from '../repositories';

@authenticate("admin")
export class RolesUsuariosController {
  constructor(
    @repository(RolesUsuariosRepository)
    public rolesUsuariosRepository : RolesUsuariosRepository,
  ) {}

  @post('/roles-usuarios')
  @response(200, {
    description: 'RolesUsuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(RolesUsuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolesUsuarios, {
            title: 'NewRolesUsuarios',
            exclude: ['id'],
          }),
        },
      },
    })
    rolesUsuarios: Omit<RolesUsuarios, 'id'>,
  ): Promise<RolesUsuarios> {
    return this.rolesUsuariosRepository.create(rolesUsuarios);
  }

  @get('/roles-usuarios/count')
  @response(200, {
    description: 'RolesUsuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RolesUsuarios) where?: Where<RolesUsuarios>,
  ): Promise<Count> {
    return this.rolesUsuariosRepository.count(where);
  }

  @get('/roles-usuarios')
  @response(200, {
    description: 'Array of RolesUsuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RolesUsuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RolesUsuarios) filter?: Filter<RolesUsuarios>,
  ): Promise<RolesUsuarios[]> {
    return this.rolesUsuariosRepository.find(filter);
  }

  @patch('/roles-usuarios')
  @response(200, {
    description: 'RolesUsuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolesUsuarios, {partial: true}),
        },
      },
    })
    rolesUsuarios: RolesUsuarios,
    @param.where(RolesUsuarios) where?: Where<RolesUsuarios>,
  ): Promise<Count> {
    return this.rolesUsuariosRepository.updateAll(rolesUsuarios, where);
  }

  @get('/roles-usuarios/{id}')
  @response(200, {
    description: 'RolesUsuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RolesUsuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RolesUsuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<RolesUsuarios>
  ): Promise<RolesUsuarios> {
    return this.rolesUsuariosRepository.findById(id, filter);
  }

  @patch('/roles-usuarios/{id}')
  @response(204, {
    description: 'RolesUsuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolesUsuarios, {partial: true}),
        },
      },
    })
    rolesUsuarios: RolesUsuarios,
  ): Promise<void> {
    await this.rolesUsuariosRepository.updateById(id, rolesUsuarios);
  }

  @put('/roles-usuarios/{id}')
  @response(204, {
    description: 'RolesUsuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rolesUsuarios: RolesUsuarios,
  ): Promise<void> {
    await this.rolesUsuariosRepository.replaceById(id, rolesUsuarios);
  }

  @del('/roles-usuarios/{id}')
  @response(204, {
    description: 'RolesUsuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rolesUsuariosRepository.deleteById(id);
  }
}
