import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {ZonaSocial, ZonaSocialRelations} from '../models';

export class ZonaSocialRepository extends DefaultCrudRepository<
  ZonaSocial,
  typeof ZonaSocial.prototype.id,
  ZonaSocialRelations
> {
  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource,
  ) {
    super(ZonaSocial, dataSource);
  }
}
