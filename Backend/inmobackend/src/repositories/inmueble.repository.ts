import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, CuartoUtil, Parqueadero, Multa} from '../models';
import {CuartoUtilRepository} from './cuarto-util.repository';
import {ParqueaderoRepository} from './parqueadero.repository';
import {MultaRepository} from './multa.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly cuartoUtil: HasOneRepositoryFactory<CuartoUtil, typeof Inmueble.prototype.id>;

  public readonly parqueadero: HasOneRepositoryFactory<Parqueadero, typeof Inmueble.prototype.id>;

  public readonly multas: HasManyRepositoryFactory<Multa, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource, @repository.getter('CuartoUtilRepository') protected cuartoUtilRepositoryGetter: Getter<CuartoUtilRepository>, @repository.getter('ParqueaderoRepository') protected parqueaderoRepositoryGetter: Getter<ParqueaderoRepository>, @repository.getter('MultaRepository') protected multaRepositoryGetter: Getter<MultaRepository>,
  ) {
    super(Inmueble, dataSource);
    this.multas = this.createHasManyRepositoryFactoryFor('multas', multaRepositoryGetter,);
    this.registerInclusionResolver('multas', this.multas.inclusionResolver);
    this.parqueadero = this.createHasOneRepositoryFactoryFor('parqueadero', parqueaderoRepositoryGetter);
    this.registerInclusionResolver('parqueadero', this.parqueadero.inclusionResolver);
    this.cuartoUtil = this.createHasOneRepositoryFactoryFor('cuartoUtil', cuartoUtilRepositoryGetter);
    this.registerInclusionResolver('cuartoUtil', this.cuartoUtil.inclusionResolver);
  }
}
