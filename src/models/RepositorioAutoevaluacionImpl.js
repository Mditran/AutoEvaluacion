import RepositorioAutoevaluacion from "./RepositorioAutoevaluacion.js";

export default class RepositorioAutoevaluacionImpl extends RepositorioAutoevaluacion {
  constructor() {
    super();
    this.conn = null;
  }

  conectar() {
    // ...
  }

  desConectar() {
    // ...
  }
}
