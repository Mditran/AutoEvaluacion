import RespositoriLabor from "../models/RespositoriLabor.js";
import ControladorGestorUsuarios from "./ControladorGestorUsuariosImpl.js";
import Labor from "./domain/Labor.js";

export default class ControladorGestorLaborImpl {
    constructor(rLabores, cUsuarios) {
        this.rLabores = rLabores;
        this.cUsuarios = cUsuarios;
    }

    registrarLabor(labor) {
        // ...
    }

    obtenerLabor(identificacion) {
        // ...
    }

    obtenerLabores() {
        // ...
    }

    actualizarLabor(labor) {
        // ...
    }

    eliminarLabor(identificacion) {
        // ...
    }
}