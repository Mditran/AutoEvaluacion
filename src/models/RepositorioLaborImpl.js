import RepositorioLabor from "./RepositorioLabor.js";

export default class RepositorioLaborImpl extends RepositorioLabor {
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
