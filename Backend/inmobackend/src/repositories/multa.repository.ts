import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {Multa, MultaRelations} from '../models';

export class MultaRepository extends DefaultCrudRepository<
  Multa,
  typeof Multa.prototype.id,
  MultaRelations
> {
  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource,
  ) {
    super(Multa, dataSource);
  }
}
