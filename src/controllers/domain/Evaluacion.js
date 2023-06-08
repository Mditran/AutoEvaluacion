import Notificador from './Notificador.js';
import UserRol from './UserRol.js';
import Periodo from './Periodo.js';
import Labor from './Labor.js';
export default class Evaluacion extends Notificador {
    constructor() {
        super();
        this.Suscriptores = [];
        this.eva_id = 0;
        this.eva_estado = 0;
        this.eva_puntaje = 0;
        this.eva_resultado = "";
        this.userrol = new UserRol();
        this.periodo = new Periodo();
        this.labor = new Labor();
    }
}