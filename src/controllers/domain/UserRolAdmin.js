import Suscriptor from './Suscriptor.js';
import Notificador from './Notificador.js';

export default class UserRolAdmin extends Suscriptor {
    constructor() {
        super();
        this.ur_evalPorRevisar = [];
    }
    actualizar(notificador) {
        this.ur_evalPorRevisar.push(notificador);
    }
}