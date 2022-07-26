import { AbrevEnum } from './abrev-enum';

export class TipoGenero {
    static readonly MASCULINO = new AbrevEnum("M", "Masculino");
    static readonly FEMENINO = new AbrevEnum("F", "Femenino");
}