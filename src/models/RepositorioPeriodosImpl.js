import RepositorioPeriodos from "./RepositorioPeriodos.js";

export default class RepositorioPeriodosImpl extends RepositorioPeriodos {
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
