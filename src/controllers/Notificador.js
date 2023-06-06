export default class Notificador {
    constructor() {
        this.suscriptores = [];
    }
    suscribirse(suscriptor) {
        this.suscript.push(suscriptor);
        return true;
    }
    desSuscribirse(suscriptor) {
        const index = this.suscriptores.indexOf(suscriptor);
        if (index !== -1) {
            this.suscriptores.splice(index, 1);
            return true;
        }
        return false;
    }
    notificar() {
        this.suscriptores.forEach((suscriptor) => {
            suscriptor.actualizar(this);
        });
    }
}