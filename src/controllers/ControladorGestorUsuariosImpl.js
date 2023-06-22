import Usuario from "./domain/Usuario.js";
import RespositorioUsuarios from "../models/RespositorioUsuarios.js";
import ControladorGestorRoles from "./ControladorGestorRolesImpl.js";

export default class ControladorGestorUsuariosImpl {
    constructor(rUsuarios, cRoles) {
        this.rUsuarios = rUsuarios;
        this.cRoles = cRoles;
    }

    registrarUsuario(usuario) {
        // ...
    }

    obtenerUsuario(identificacion) {
        // ...
    }

    obtenerUsuarios() {
        // ...
    }

    actualizarUsuario(usuario) {
        // ...
    }

    eliminarUsuario(identificacion) {
        // ...
    }
}

