import RepositorioPeriodos from "../models/RepositorioPeriodos.js";
import ControladorGestorAutoevaluacion from "./ControladorGestorAutoevaluacionImpl.js";
import Periodo from "./domain/Periodo.js";
export default class ControladorGestorPeriodosImpl {
    constructor(rPeriodos, cAutoevaluacion) {
        this.rPeriodos = rPeriodos;
        this.cAutoevaluacion = cAutoevaluacion;
    }
    registrarPeriodo(periodo) {
        // ...
    }
    Periodo(identificacion) {
        // ...
    }
    obtenerPeriodos() {
        // ...
    }
    actualizarPeriodo(periodo) {
        // ...
    }
    eliminarPeriodo(identificacion) {
        // ...
    }
}