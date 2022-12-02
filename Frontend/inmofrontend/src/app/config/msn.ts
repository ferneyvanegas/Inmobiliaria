// Clase para enviar mensajes
/*
    Los tipos de mensajes deberían ser:
    warning, success y error
*/

export class Msn {
    type: string;
    msn: string;

    constructor(type:string, msn:string){
        this.type = type;
        this.msn = msn;
    }

    getType(){
        return this.type;
    }

    getMsn(){
        return this.msn;
    }
}
