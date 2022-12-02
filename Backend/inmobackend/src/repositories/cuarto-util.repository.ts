import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {CuartoUtil, CuartoUtilRelations} from '../models';

export class CuartoUtilRepository extends DefaultCrudRepository<
  CuartoUtil,
  typeof CuartoUtil.prototype.id,
  CuartoUtilRelations
> {
  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource,
  ) {
    super(CuartoUtil, dataSource);
  }
}
