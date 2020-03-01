//@TODO añadir S/N y accesorios

export class Dispositivo {
    constructor(
        public nombre: string,
        public marca: string,
        public estado: String[],
        public accesorios: String[],
        public sn: String
    ){}
}
