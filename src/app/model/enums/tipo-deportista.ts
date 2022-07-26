import { SimpleEnum } from './simple-enum';

export class TipoDeportista {
    static readonly ESTUDIANTE = new SimpleEnum("Estudiante");
    static readonly DOCENTE = new SimpleEnum("Docente");
    static readonly ADMINISTRATIVO = new SimpleEnum("Administrativo");
    static readonly FAMILIAR = new SimpleEnum("Familiar");
}