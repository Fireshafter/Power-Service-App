export class Cambio {
    constructor(
        public usuario: String,
        public mensaje: String,
        public fecha: Date = new Date(Date.now())
    ){}
}
