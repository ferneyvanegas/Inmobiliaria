import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { AuthenticationComponent, registerAuthenticationStrategy } from '@loopback/authentication';
import { EstrategiaAdmin } from './strategies/admin.strategy';
import { EstrategiaContador } from './strategies/contador.strategy';
import { EstrategiaHabitante } from './strategies/habitante.strategy';
import { EstrategiaPropietario } from './strategies/propietario.strategy';
import { EstrategiaRevisorFiscal } from './strategies/revisor-fiscal.strategy';
import { EstrategiaVigilante } from './strategies/vigilante.strategy';

export {ApplicationConfig};

export class App extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    registerAuthenticationStrategy(this, EstrategiaAdmin);
    registerAuthenticationStrategy(this, EstrategiaContador);
    registerAuthenticationStrategy(this, EstrategiaHabitante);
    registerAuthenticationStrategy(this, EstrategiaPropietario);
    registerAuthenticationStrategy(this, EstrategiaRevisorFiscal);
    registerAuthenticationStrategy(this, EstrategiaVigilante);
    this.component(AuthenticationComponent);
  }
}