import { AbrevEnum } from './abrev-enum';

export class TipoUsuario {
    static readonly USUARIO = new AbrevEnum('USER', 'Usuario');
    static readonly ADMINISTRADOR = new AbrevEnum("ADMIN", "Administrador");
    static readonly SUPER = new AbrevEnum("SUPER", "Super Administrador");
}