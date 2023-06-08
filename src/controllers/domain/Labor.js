import TipoLabor from './TipoLabor.js';
export default class Labor {
    constructor() {
        this.lab_id = 0;
        this.lab_nombre = "";
        this.lab_horas = 0;
        this.tipolabor = new TipoLabor();
    }
}