import RespositorioUsuarios from "./RespositorioUsuarios.js";

export default class RepositorioUsuariosImpl extends RespositorioUsuarios {
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
