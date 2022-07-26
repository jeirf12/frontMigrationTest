import { SimpleEnum } from './simple-enum';

export class TipoReporte {
    static readonly RANGO = new SimpleEnum("Rango");
    static readonly ANUAL = new SimpleEnum("Anual");
    static readonly SEMESTRAL = new SimpleEnum("Semestral");
    static readonly MENSUAL = new SimpleEnum("Mensual");
}