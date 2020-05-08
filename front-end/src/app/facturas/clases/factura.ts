import { Costes } from './costes'

export class Factura {
    constructor(
        public distribuidor: String,
        public idfactura: String,
        public costes: Costes[],
        public fecha: Date,
        public comentario: String,
        public _id?: Number
    ){}
}
