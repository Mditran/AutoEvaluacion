import ControladorGestorAutoevaluacion from "../controllers/ControladorGestorAutoevaluacionImpl.js";
import Periodo from "../controllers/domain/Periodo.js";
import Evaluacion from "../controllers/domain/Evaluacion.js";

export default class GestionAutoevaluacionImpl {
  constructor(cAutoevaluacion) {
    this.controladorAutoevaluacion = cAutoevaluacion;
  }

  crearPeriodoAcademico(periodo) {
    // ...
  }

  obtenerPeriodosAcademicos() {
    // ...
  }

  editarPeriodoAcademico(periodo) {
    // ...
  }

  eliminarPeriodoAcademico(id) {
    // ...
  }

  enviarNotificacionAutoevaluacion() {
    // ...
  }

  enviarRecordatorioAutoevaluacion() {
    // ...
  }

 arAutoevaluacion() {
    // ...
  }

  generarReporteAutoevaluaciones() {
    // ...
  }

  guardarAutoevaluacion(evaluacion) {
    // ...
  }

  obtenerevaluaciones() {
    // ...
  }

  obtenerAutoevaluacion(id) {
    // ...
  }

  editarAutoevaluacion(evaluacion) {
    // ...
  }

  eliminarAutoevaluacion(id) {
    // ...
  }
}
