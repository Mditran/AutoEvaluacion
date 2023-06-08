import Usuario from './Usuario.js';
import Rol from './Rol.js';
export default class UserRol {
    constructor() {
        this.ur_fechainicio = new Date();
        this.ur_fechafin = new Date();
        this.usuario = new Usuario();
        this.rol = new Rol();
    }
}