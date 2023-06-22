import RespositoriAutoevaluacion from "../models/RespositoriAutoevaluacion.js";
import ControladorGestorUsuarios from "./ControladorGestorUsuariosImpl.js";
import ControladorGestorRoles from "./ControladorGestorRolesImpl.js";
import ControladorGestorLabor from "./ControladorGestorLaborImpl.js";
import Evaluacion from "./domain/Evaluacion.js";

export default class ControladorGestorAutoevaluacionImpl {
    constructor(rAutoevaluacion, cUsuarios, cRoles, cLabor) {
        this.rAutoevaluacion = rAutoevaluacion;
        this.cUsuarios = cUsuarios;
        this.cRoles = cRoles;
        this.cLabor = cLabor;
    }

    guardarAutoevaluacion(evaluacion) {
        // ...
    }

    obtenerAutoevaluacion(id) {
        // ...
    }

    obtenerAutoevaluaciones() {
        // ...
    }

    editarAutoevaluacion(evaluacion) {
        // ...
    }

    eliminarAutoevaluacion(id) {
        // ...
    }
}
