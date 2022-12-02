import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {InmobackendmongoDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol, RolesUsuarios, Inmueble} from '../models';
import {RolesUsuariosRepository} from './roles-usuarios.repository';
import {RolRepository} from './rol.repository';
import {InmuebleRepository} from './inmueble.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly roles: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype.id,
          RolesUsuarios,
          typeof Usuario.prototype.id
        >;

  public readonly inmueble: HasOneRepositoryFactory<Inmueble, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.inmobackendmongo') dataSource: InmobackendmongoDataSource, @repository.getter('RolesUsuariosRepository') protected rolesUsuariosRepositoryGetter: Getter<RolesUsuariosRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Usuario, dataSource);
    this.inmueble = this.createHasOneRepositoryFactoryFor('inmueble', inmuebleRepositoryGetter);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolRepositoryGetter, rolesUsuariosRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
