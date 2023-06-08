import ControladorGestorAutoevaluacion from "../controllers/ControladorGestorAutoevaluacionImpl.js";

import Evaluacion from "../controllers/domain/Evaluacion.js";

export default class GestionAutoevaluacionImpl {
  constructor(cAutoevaluacion) {
    this.controladorAutoevaluacion = cAutoevaluacion;
  }

  enviarNotificacionAutoevaluacion() {
    // ...
  }

  enviarRecordatorioAutoevaluacion() {
    // ...
  }

  cerrarAutoevaluacion() {
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
