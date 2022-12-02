import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {RolesUsuarios, RolesUsuariosRelations} from '../models';

export class RolesUsuariosRepository extends DefaultCrudRepository<
  RolesUsuarios,
  typeof RolesUsuarios.prototype.id,
  RolesUsuariosRelations
> {
  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource,
  ) {
    super(RolesUsuarios, dataSource);
  }
}
