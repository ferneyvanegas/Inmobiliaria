import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {Conjunto, ConjuntoRelations, Inmueble, Torre, ZonaSocial} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {TorreRepository} from './torre.repository';
import {ZonaSocialRepository} from './zona-social.repository';

export class ConjuntoRepository extends DefaultCrudRepository<
  Conjunto,
  typeof Conjunto.prototype.id,
  ConjuntoRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Conjunto.prototype.id>;

  public readonly torres: HasManyRepositoryFactory<Torre, typeof Conjunto.prototype.id>;

  public readonly zonasSociales: HasManyRepositoryFactory<ZonaSocial, typeof Conjunto.prototype.id>;

  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('ZonaSocialRepository') protected zonaSocialRepositoryGetter: Getter<ZonaSocialRepository>,
  ) {
    super(Conjunto, dataSource);
    this.zonasSociales = this.createHasManyRepositoryFactoryFor('zonasSociales', zonaSocialRepositoryGetter,);
    this.registerInclusionResolver('zonasSociales', this.zonasSociales.inclusionResolver);
    this.torres = this.createHasManyRepositoryFactoryFor('torres', torreRepositoryGetter,);
    this.registerInclusionResolver('torres', this.torres.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
