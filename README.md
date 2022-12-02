# Inmobiliaria Misión TIC

> *If it compiles, it is good; if it boots up it is perfect!* |  **Linus Torvarlds**


## Información

### Proyecto
------
* **Nombre**: Inmobiliaria Misión TIC
* **Propósito**: Sistema de Gestión de propiedad horizontal
* **Materia**: Desarrollo de Aplicaciones Web
* **Versión**: 1.0.14
* **Ciclo**: 4A
* **Institución**: Universidad de Caldas
* **Programa**: Misión TIC 2022
* **URL**: Este proyecto fue desarrollado por un equipo de 5 personas (cada uno con un rol) como parte del programa Misión Tic 2022
* **Documentación**: Toda la documentación, requisitos, diagramas, alcance, etc... se encuentra en la carpeta _Documentos_.

### Dev-Team
------
* **Grupo**: 59
* **Equipo**: #2
* **Nombre:**: X-Force
* **Docente**: Diana Patricia Marín Flores
* **Tutora**: Yaneth Mejía
* **Daily's**: L-V 5pm-5:15pm
* **Integrantes**:

| PROGRAMADOR(A) | ROL | EMAIL | 
| ------- | ------- | ------- |
| Merilee Jaydeve Miranda Mendieta | Diseñadora Software | jaydevemiranda28@gmail.com - merjmiranda@misena.edu.co |
| Diego Fernando Lotero Vasquez | Diseñador UI | dlotero17@gmail.com |
| José Julián Naranjo Florez | Tester| julianflorez2439@gmail.com |
| Juan Camilo Larrota Ruiz | Adm. Configuración | larrota.juancamilo@gmail.com |
| Ferney Vanegas Hernández | Líder Equipo | ferneyvanegas@gmail.com - fvanegash@libertadores.edu.co |


![XForce](Img/xforce-team-circle.png 'X-Force')

*Foto casual del Equipo X-Force: Fascinación por programar*

## NOTAS DE VERSIÓN FINAL
* **Fecha**: 02 de Diciembre del 2022

**Estructura FrontEnd:**
* Módulo Global
    * Componente pie-pagina
* Módulo Landing
    * Componente nosotros
    * Componente contactenos
* Módulo login
    * Componente nav-bar-login
    * Componente acceso *(Completamente Funcional *
    * Componente registro *(Completamente Funcional)*
    * Componente recuperar-clave *(Completamente Funcional)*
* Módulo appl.
    * Componente nav-bar
    * Módulo parametrizacion
        * Componente side-nav
        * Componente general
    * Módulo Usuario
        * Componente datos-personales
        * Componente cambiar-pass *(Completamente Funcional)*
    * Módulo accesos
        * Componente roles *(CRUD: Listar Funcional)*
        * Componente usuarios *(CRUD: Listar Funcional)*
        * Componente crear-editar *(CRUD: Crear y Editar)*
        * Componente eliminar *(CRUD: Buscar y Eliminar)*
    * Módulo facturacion
    * Módulo reportes

## DEPENDENCIAS
**BackEnd (LoopBack)**:
* npm i node-fetch
* npm i jsonwebtoken
* npm i password-generator
* npm i crypto-js
* npm i node-fetch@2.6.6
* npm i @loopback/authentication
* npm i @loopback/security
* npm i parse-bearer-token
* npm install --save @sendgrid/mail

**FrontEnd (Angular)**:
* npm install --save @fortawesome/fontawesome-free
* npm i crypto-js
* npm i @auth0/angular-jwt (https://www.youtube.com/watch?v=cuRDyrcWddg&ab_channel=OOPCoders)
* npm install ngx-captcha

## Nota
* Actualizar las llaves de Sendgrid (Backend), MongoDB (Backend), UrlBase (Frontend) y Recaptcha (Frontend)