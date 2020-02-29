import { Cliente } from './cliente';
import { Dispositivo } from './dispositivo';
import { Servicio } from './servicio';
import { Cambio } from './cambio';

export class Reparacion {
    constructor(
        public _id: Number,
        public orden: Number,
        public estado: String,
        public fechaentrada: Date,
        public lastedit: Date,
        public taller: String,
        public cliente: Cliente,
        public dispositivo: Dispositivo,
        public servicio: String,
        public descripcion: String,
        public costes: Servicio[],
        public log: Cambio[],
        
    ){

    }
}
