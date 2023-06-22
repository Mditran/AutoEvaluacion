import RepositorioRoles from "./RepositorioRoles.js";

export default class RepositorioRolesImpl extends RepositorioRoles {
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
