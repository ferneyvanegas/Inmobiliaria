import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

export class EstrategiaContador implements AuthenticationStrategy{
    name: string = "contador";

    constructor(
        @service(AutenticacionService)
        public servicioAutentificacion : AutenticacionService
    ){}

    async authenticate(request:Request): Promise<UserProfile|undefined>{
        let token = parseBearerToken(request);
        if(token){
            let datos = this.servicioAutentificacion.validarTokenJWT(token);
            if(datos){
                if(datos.data){
                    if(datos.data.roles[0].rol == 'contador'){
                        let perfil: UserProfile = Object.assign({
                            nombre: datos.data.nombre,
                            correo: datos.data.correoElec,
                            menu: [
                                {
                                    item: 'Facturación',
                                    routerLink: '/appl/facturacion'
                                },
                                {
                                    item: 'Reportes',
                                    routerLink: '/appl/reportes'
                                }
                            ]
                        })
                        return perfil;
                    }
                    else{
                        throw new HttpErrors[401]("Operación restringida")
                    }
                }
            }
            else{
                throw new HttpErrors[401]("El token incluido no es valido.")
            }
        }
        else{
            throw new HttpErrors[401]("No se ha incluido un token en la solicitud");
        }
    }
}