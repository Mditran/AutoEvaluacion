import ControladorGestorLabor from "../controllers/ControladorGestorLaborImpl.js";
import Usuario from "../controllers/domain/Usuario.js";
import Labor from "../controllers/domain/Labor.js";
import Evaluacion from "../controllers/domain/Evaluacion.js";

export default class GestionLaboresImpl {
  constructor(cLabor) {
    this.controladorGestorLabor = cLabor;
  }

  crearLabor(labor) {
    // ...
  }

  obtenerLabores() {
    // ...
  }

  obtenerLabor(id) {
    // ...
  }

  editarLabor(labor) {
    // ...
  }

  eliminarLabor(id) {
    // ...
  }

  obtenerUsuariosPorLabor(labor) {
    // ...
  }

  asignarUsuarioALabor(usuario, labor) {
    // ...
  }

  desasignarDocenteDeLabor(usuario, labor) {
    // ...
  }

  obtenerEvaluacionesPorLabor(labor) {
    // ...
  }
}
