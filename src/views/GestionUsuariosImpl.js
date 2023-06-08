import ControladorGestorUsuarios from "../controllers/ControladorGestorUsuariosImpl.js";
import Usuario from "../controllers/domain/Usuario.js";
import Rol from "../controllers/domain/Rol.js";

export default class GestionUsuariosImpl {
  constructor(cUsuarios) {
    this.controladorGestionUsuarios = cUsuarios;
  }

  crearUsuario(usuario) {
    // ...
  }

  obtenerUsuarios() {
    // ...
  }

  obtenerUsuario(id) {
    // ...
  }

  editarUsuario(usuario) {
    // ...
  }

  eliminarUsuario(id) {
    // ...
  }

  obtenerRoles() {
    // ...
  }

  asignarRolAUsuario(rol, usuario) {
    // ...
  }

  desasignarRolDeUsuario(rol, usuario) {
    // ...
  }

  inactivarUsuario(usuario) {
    // ...
  }
}
