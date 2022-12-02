import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {Parqueadero, ParqueaderoRelations} from '../models';

export class ParqueaderoRepository extends DefaultCrudRepository<
  Parqueadero,
  typeof Parqueadero.prototype.id,
  ParqueaderoRelations
> {
  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource,
  ) {
    super(Parqueadero, dataSource);
  }
}
