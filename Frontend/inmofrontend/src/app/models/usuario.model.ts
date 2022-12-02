import { RolModel } from '../models/rol.model';

export class UsuarioModel {
    id?: string;
    priNombre?: string;
    segNombre?: string;
    priApellido?: string;
    segApellido?: string;
    documento?: string;
    correoElec?: string;
    celular?: string;
    pass?: string;
    rolId?:string;
    roles?: RolModel[];
}
