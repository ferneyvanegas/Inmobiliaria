import { service } from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import {CambioPass, Crecenciales, Usuario, Rol, ResetPass, RolesUsuarios} from '../models';
import {UsuarioRepository, RolRepository, RolesUsuariosRepository} from '../repositories';
import { AutenticacionService } from '../services';
import { Keys } from '../config/keys';
import { authenticate } from '@loopback/authentication';
import {inject} from '@loopback/core';
import {SecurityBindings, UserProfile} from '@loopback/security'; // Se precisan para extraer datos según estrategia
import { UsuarioAsignadoRol } from '../models/usuario-asignado-rol.model';
const fetch = require('node-fetch');
const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Tomar la SENDGRID_API_KEY de una variable de entorno
sgMail.setApiKey(Keys.SENDGRID_API_KEY);


@authenticate("admin")
export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @repository(RolRepository)
    public rolRepository : RolRepository,
    @repository(RolesUsuariosRepository)
    public rolesUsuariosRepository : RolesUsuariosRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
    // Datos de usuario según estrategia
    @inject(SecurityBindings.USER, {optional: true}) private userProfile: UserProfile
  ) {}

  @authenticate.skip()
  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let usuarioExist = await this.usuarioRepository.findOne({
      where: {
        correoElec: usuario.correoElec
      }
    });
    // Validar primero si el correo existe. De ser así, no puede crearse el usuario
    if(usuarioExist){
      throw new HttpErrors[401]("Este email ya está registrado.");
    }
    else{
      // Proceso para asignar una clave, cifrarla y almacenarla en la base de datos
      // ==============================================
      let password = this.servicioAutenticacion.generarPass();
      let passCifrada = this.servicioAutenticacion.cifrarPass(password);
      usuario.pass = passCifrada;
      let u = await this.usuarioRepository.create(usuario);

      // Asignación de Rol
      // ==============================================
      let rol = await this.rolRepository.findOne(
        {
          where:{
            rol:'admin'
          }
        }
      ); // Se ubica el rol con usuario administrador. En principio, todo usuario es administrador

      let dataRolesUsuario = new RolesUsuarios();
      dataRolesUsuario.usuarioId = u.id;
      dataRolesUsuario.rolId = rol?.id;

      let rU = await this.rolesUsuariosRepository.create(dataRolesUsuario);

      // ==============================================

      // Notificar al usuario
      // ==============================================
      let destino = usuario.correoElec;
      let asunto = 'Registro Inmobiliaria MinTic';
      let contenido = `
      <h1>Hola!</h1>
      <p>
        Te has registrado satisfactoriamente en el sistema de Inmobiliaria MinTic. Tus credenciales para poder ingresar son:
      </p>
      <hr/> 
      <p><strong>Usuario:</strong> ${usuario.correoElec}</p>
      <p><strong>Contraseña:</strong> ${password}</p>
      <hr/>
      `;
      // Descomentar si deseas usar un servicio de Email en otro servidor, y modificar según sea necesario
      /* fetch(`${Keys.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data:any) => {
        // console.log(data);
        console.log(`Registro de usuario completo. Se envió notificación a correo ${usuario.correoElec}`);
      }) */

      let msg = {
        to: destino,
        from: Keys.sendGridEmailVerified,
        subject: asunto,
        text: `Hola!Te has registrado satisfactoriamente en el sistema de Inmobiliaria MinTic. Tus credenciales para poder ingresar son: Usuario: ${usuario.correoElec} | Contraseña: ${password}`,
        html: contenido,
      };

      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
      // ==============================================
      return u;
    }
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario | null> {
    let p = this.usuarioRepository.findOne({where: {id: id}, include :["roles"]});
    return p;

  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioAsignadoRol)}},
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsignadoRol, {
            title: 'CrearUsuario'
          }),
        },
      },
    })
    usuario: UsuarioAsignadoRol,
  ): Promise<void> {
    // Debe extrearse la contraseña del usuario primero. Por ello se busca
    let actualUsuario = await this.usuarioRepository.findOne({where: {id: id}});

    let u = new Usuario();
    u.id = id;
    u.priNombre = usuario.priNombre;
    u.segNombre = usuario.segNombre;
    u.priApellido = usuario.priApellido;
    u.segApellido= usuario.segApellido;
    u.documento = usuario.documento;
    u.celular = usuario.celular;
    u.correoElec = usuario.correoElec;
    if(actualUsuario)
      u.pass = actualUsuario.pass;
    await this.usuarioRepository.replaceById(id, u);

    // Actualizar Rol
    // ==============================================
    let rol = await this.rolesUsuariosRepository.findOne(
      {
        where:{
          usuarioId: id
        }
      }
    ); // Se ubica el rol del usuario 
    if(rol){
      rol.rolId = usuario.rolId;
      await this.rolesUsuariosRepository.replaceById(rol.id, rol);
    }
    // ==============================================
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id); // Eliminación del usuario

    // Eliminación de los roles
    let roles = await this.rolesUsuariosRepository.find({where: {usuarioId: id}});
    roles.forEach(element => {
      this.rolesUsuariosRepository.deleteById(element.id);
    });
  }
  
  // MÉTODOS PROGRAMADOS POR EL EQUIPO X-FORCE

  // Método de identificacion de usuarios (Login = identificarUsuario)
  @authenticate.skip()
  @post("/identificarUsuario", {
    responses:{
      '200':{
        description:"Identificacion de usuarios"
      }
    }
  })
  async identificarUsuario(
    @requestBody() credenciales: Crecenciales
  ){
    let p = await this.servicioAutenticacion.identificarUsuario(credenciales.usuario, credenciales.pass)
    if(p){
      // Si el usuario existe devuelve un objeto con los datos y genera un token (tk)
      let token = this.servicioAutenticacion.generarTokenJWT(p);
      // En el token va toda la información del usuario
      return{
        tk: token
      }
    }// Si al validar el usuario no existe, se genera un error 401 que impide el acceso
    else {
      throw new HttpErrors[401]("Credenciales incorrectas. Acceso no autorizado.");
    }
  }

  // Método para recuperación de contraseña
  @authenticate.skip()
  @post('/recuperarPass')
  @response(200,{
    description: 'Recuperación del password de usuario'
  })
  async recuperarPass(
    @requestBody() resetPass: ResetPass
  ): Promise<Boolean>{
    let usuario = await this.usuarioRepository.findOne({
      where: {
        correoElec: resetPass.email
      }
    });
    if(usuario){
      let password = this.servicioAutenticacion.generarPass();
      let passCifrada = this.servicioAutenticacion.cifrarPass(password);
      usuario.pass = passCifrada;
      await this.usuarioRepository.updateById(usuario.id,usuario);

      // Notificar al usuario
      // ==============================================
      let destino = usuario.correoElec;
      let asunto = 'Recuperación de contraseña Inmobiliaria MinTic';
      let contenido = `
      <h1>Hola!</h1>
      <p>
        Has solicitado el cambio de contraseña. Tus nuevas credenciales para poder ingresar son:
      </p>
      <hr/> 
      <p><strong>Usuario:</strong> ${usuario.correoElec}</p>
      <p><strong>Contraseña:</strong> ${password}</p>
      <hr/>
      `;

      // Descomentar y modificar en medida que el servicio de Email esté para consumir en otro servidor
      /* fetch(`${Keys.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data:any) => {
        // console.log(data);
        console.log(`Actualización de usuario completo. Se envió notificación a correo ${usuario?.correoElec}`);
      }) */

      let msg = {
        to: destino,
        from: Keys.sendGridEmailVerified,
        subject: asunto,
        text: `Hola! Has solicitado el cambio de contraseña. Tus nuevas credenciales para poder ingresar son: Usuario: ${usuario.correoElec} | Contraseña: ${password}`,
        html: contenido,
      };

      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
      // ==============================================
      return true;
    }
    else{
      throw new HttpErrors[401]("Email no registrado");
    }
  }

  // Método para actualizar password
  @post('/cambiarPass')
  @response(200, {
    description: 'Actualización de password de usuario'
  })
  async cambiarPass(
    @requestBody() cambio:CambioPass
  ):Promise<Boolean>{
    // La validación se hace según el email que llegue en el Token, según la estrategia implementada
    let usuario = await this.usuarioRepository.findOne({
      where:{
        correoElec: this.userProfile.correo
      }
    });
    if(usuario){
      // Validar si el usuario y la contraseña actual suministradas son equivalentes
      let login = await this.servicioAutenticacion.identificarUsuario(this.userProfile.correo, cambio.actual);
      if(login){
        if(cambio.nueva == cambio.revalidar){
          usuario.pass = this.servicioAutenticacion.cifrarPass(cambio.nueva);
          await this.usuarioRepository.updateById(usuario.id, usuario);

          // Notificar al usuario
          // ==============================================
          let destino = usuario.correoElec;
          let asunto = 'Actualización de contraseña Inmobiliaria MinTic';
          let contenido = `
          <h1>Hola!</h1>
          <p>
            Actualizaste tu contraseña. Tus nuevas credenciales para poder ingresar son:
          </p>
          <hr/> 
          <p><strong>Usuario:</strong> ${usuario.correoElec}</p>
          <p><strong>Contraseña:</strong> ${cambio.nueva}</p>
          <hr/>
          `;

          // Descomentar y modificar en medida que el servicio de Email esté para consumir en otro servidor
          /* fetch(`${Keys.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
          .then((data:any) => {
            // console.log(data);
            console.log(`Modificación de usuario completo. Se envió notificación a correo ${usuario?.correoElec}`);
          }) */

          let msg = {
            to: destino,
            from: Keys.sendGridEmailVerified,
            subject: asunto,
            text: `Hola! Actualizaste tu contraseña. Tus nuevas credenciales para poder ingresar son: Usuario: ${usuario.correoElec} | Contraseña: ${cambio.nueva}`,
            html: contenido,
          };
    
          (async () => {
            try {
              await sgMail.send(msg);
            } catch (error) {
              console.error(error);
    
              if (error.response) {
                console.error(error.response.body)
              }
            }
          })();
          // ==============================================
          return true;
        }
        else{
          throw new HttpErrors[401]("Las contraseñas suministradas no son iguales");
        }
 
      }
      else{
        throw new HttpErrors[401]("Contraseña actual inválida");
      }       
    }
    else{
      throw new HttpErrors[401]("Email no registrado");
    }
  }

  // Método para obtener Menú
  @authenticate("admin","contador","habitante","propietario","revisorFiscal","vigilante")
  @get('/obtenerMenu')
  @response(200, {
    description: 'Se obtendrá el listado del menú, según el perfil'
  })
  async obtenerMenu(
  ):Promise<any[]>{
    // La validación se hace según el email que llegue en el Token, según la estrategia implementada
    let usuario = await this.usuarioRepository.findOne({
      where:{
        correoElec: this.userProfile.correo
      }
    });
    if(usuario){
      return this.userProfile.menu;
    }
    else{
      throw new HttpErrors[401]("Email no registrado");
    }
  }


  // Método para crear usuarios
  @post('/crearUsuario')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioAsignadoRol)}},
  })
  async crearUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioAsignadoRol, {
            title: 'CrearUsuario'
          }),
        },
      },
    })
    usuario: UsuarioAsignadoRol
  ): Promise<Usuario> {
    let usuarioExist = await this.usuarioRepository.findOne({
      where: {
        correoElec: usuario.correoElec
      }
    });
    // Validar primero si el correo existe. De ser así, no puede crearse el usuario
    if(usuarioExist){
      throw new HttpErrors[401]("Este email ya está registrado.");
    }
    else{
      // Proceso para asignar una clave, cifrarla y almacenarla en la base de datos
      // ==============================================
    
      let nuevoUsuario = new Usuario();
      nuevoUsuario.priNombre = usuario.priNombre;
      nuevoUsuario.segNombre = usuario.segNombre;
      nuevoUsuario.priApellido = usuario.priApellido;
      nuevoUsuario.segApellido= usuario.segApellido;
      nuevoUsuario.documento = usuario.documento;
      nuevoUsuario.celular = usuario.celular;
      nuevoUsuario.correoElec = usuario.correoElec;
      let password = this.servicioAutenticacion.generarPass();
      let passCifrada = this.servicioAutenticacion.cifrarPass(password);
      nuevoUsuario.pass = passCifrada;

      let u = await this.usuarioRepository.create(nuevoUsuario);

      // Asignación de Rol
      // ==============================================
      let rol = await this.rolRepository.findOne(
        {
          where:{
            id: usuario.rolId
          }
        }
      ); // Se ubica el rol con usuario administrador. En principio, todo usuario es administrador

      let dataRolesUsuario = new RolesUsuarios();
      dataRolesUsuario.usuarioId = u.id;
      dataRolesUsuario.rolId = rol?.id;

      let rU = await this.rolesUsuariosRepository.create(dataRolesUsuario);

      // ==============================================

      // Notificar al usuario
      // ==============================================
      let destino = usuario.correoElec;
      let asunto = 'Registro Inmobiliaria MinTic';
      let contenido = `
      <h1>Hola!</h1>
      <p>
        Fuiste registrado en el sistema de Inmobiliaria MinTic por un administrador. Tus credenciales para poder ingresar son:
      </p>
      <hr/> 
      <p><strong>Usuario:</strong> ${usuario.correoElec}</p>
      <p><strong>Contraseña:</strong> ${password}</p>
      <hr/>
      `;
      
      // Descomentar y modificar en medida que el servicio de Email esté para consumir en otro servidor
      /* fetch(`${Keys.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data:any) => {
        // console.log(data);
        console.log(`Registro de usuario completo. Se envió notificación a correo ${usuario.correoElec}`);
      }) */

      let msg = {
        to: destino,
        from: Keys.sendGridEmailVerified,
        subject: asunto,
        text: `Hola! Fuiste registrado en el sistema de Inmobiliaria MinTic por un administrador. Tus credenciales para poder ingresar son: Usuario: ${usuario.correoElec} | Contraseña: ${password}`,
        html: contenido,
      };

      (async () => {
        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error(error);

          if (error.response) {
            console.error(error.response.body)
          }
        }
      })();
      // ==============================================
      return u;
    }
  }
}
